import { useState } from "react";
import { Download, FileText, Calendar as CalendarIcon, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { type ContentItem } from "@shared/schema";

interface CalendarExportProps {
  contentItems: ContentItem[];
}

export function CalendarExport({ contentItems }: CalendarExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateCSV = (items: ContentItem[]) => {
    const headers = ['Title', 'Description', 'Platform', 'Status', 'Scheduled Date', 'Created Date'];
    const csvContent = [
      headers.join(','),
      ...items.map(item => [
        `"${item.title.replace(/"/g, '""')}"`,
        `"${(item.description || '').replace(/"/g, '""')}"`,
        item.platform,
        item.status,
        item.scheduledDate ? new Date(item.scheduledDate).toISOString() : '',
        item.createdAt ? new Date(item.createdAt).toISOString() : ''
      ].join(','))
    ].join('\n');
    
    return csvContent;
  };

  const generateICS = (items: ContentItem[]) => {
    const now = new Date();
    const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ContentPro//Content Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    items.forEach((item, index) => {
      const startDate = new Date(item.scheduledDate || new Date());
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
      
      const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:content-${item.id}@contentpro.app`,
        `DTSTART:${formatDate(startDate)}`,
        `DTEND:${formatDate(endDate)}`,
        `DTSTAMP:${dtStamp}`,
        `SUMMARY:${item.title}`,
        `DESCRIPTION:${item.description || ''} - Platform: ${item.platform} - Status: ${item.status}`,
        `CATEGORIES:${item.platform.toUpperCase()}`,
        `STATUS:${item.status === 'posted' ? 'CONFIRMED' : item.status === 'scheduled' ? 'TENTATIVE' : 'NEEDS-ACTION'}`,
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvContent = generateCSV(contentItems);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(csvContent, `contentpro-calendar-${timestamp}.csv`, 'text/csv');
      toast.success('📊 Calendar exported to CSV successfully!');
    } catch (error) {
      toast.error('Failed to export calendar to CSV');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportICS = async () => {
    setIsExporting(true);
    try {
      const icsContent = generateICS(contentItems);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(icsContent, `contentpro-calendar-${timestamp}.ics`, 'text/calendar');
      toast.success('📅 Calendar exported to ICS successfully! You can now import this into Google Calendar, Outlook, or Apple Calendar.');
    } catch (error) {
      toast.error('Failed to export calendar to ICS');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = async () => {
    setIsExporting(true);
    try {
      const jsonContent = JSON.stringify({
        exportDate: new Date().toISOString(),
        totalItems: contentItems.length,
        contentItems: contentItems.map(item => ({
          ...item,
          scheduledDate: item.scheduledDate ? new Date(item.scheduledDate).toISOString() : null,
          createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
          updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null
        }))
      }, null, 2);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadFile(jsonContent, `contentpro-backup-${timestamp}.json`, 'application/json');
      toast.success('💾 Complete backup exported to JSON successfully!');
    } catch (error) {
      toast.error('Failed to export backup to JSON');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Your Calendar
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Export your content calendar in multiple formats for backup or integration with other tools.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Total Content Items</p>
              <p className="text-sm text-muted-foreground">{contentItems.length} items ready to export</p>
            </div>
            <Badge variant="outline">
              {contentItems.filter(item => item.status === 'scheduled').length} scheduled
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-4">
            {/* CSV Export */}
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">CSV Export</p>
                  <p className="text-sm text-muted-foreground">Spreadsheet format for data analysis</p>
                </div>
              </div>
              <Button 
                onClick={handleExportCSV} 
                disabled={isExporting || contentItems.length === 0}
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* ICS Export */}
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">ICS Calendar</p>
                  <p className="text-sm text-muted-foreground">Import into Google Calendar, Outlook, Apple Calendar</p>
                </div>
              </div>
              <Button 
                onClick={handleExportICS} 
                disabled={isExporting || contentItems.length === 0}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Export ICS
              </Button>
            </div>

            {/* JSON Backup */}
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">JSON Backup</p>
                  <p className="text-sm text-muted-foreground">Complete backup with all data preserved</p>
                </div>
              </div>
              <Button 
                onClick={handleExportJSON} 
                disabled={isExporting || contentItems.length === 0}
                size="sm"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>

          {contentItems.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No content items to export.</p>
              <p className="text-sm">Create some content first to use the export features.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Integration Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>Google Calendar:</strong> Import the ICS file by going to Settings → Import & export → Select file</p>
            <p><strong>Outlook:</strong> In Calendar view, go to Add calendar → Upload from file → Select ICS file</p>
            <p><strong>Apple Calendar:</strong> Double-click the ICS file or drag it into the Calendar app</p>
            <p><strong>Excel/Sheets:</strong> Open the CSV file directly for data analysis and reporting</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}