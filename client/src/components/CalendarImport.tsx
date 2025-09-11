import { useState, useRef } from "react";
import { Upload, FileText, Calendar as CalendarIcon, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "sonner";
import { type ContentItem } from "@shared/schema";

interface ImportedItem {
  title: string;
  description?: string;
  platform: 'social' | 'email' | 'blog';
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'posted';
}

interface CalendarImportProps {
  onImportComplete?: (itemsImported: number) => void;
}

export function CalendarImport({ onImportComplete }: CalendarImportProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
    imported?: ImportedItem[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Mutation to create content items
  const createMutation = useMutation({
    mutationFn: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => 
      apiRequest('POST', '/api/content', item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
    }
  });

  const parseCSV = (content: string): ImportedItem[] => {
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    
    const items: ImportedItem[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
      
      if (values.length < headers.length) continue;
      
      const item: any = {};
      headers.forEach((header, index) => {
        item[header] = values[index];
      });
      
      // Map to our content structure
      const mappedItem: ImportedItem = {
        title: item.title || item.summary || item.subject || `Imported Item ${i}`,
        description: item.description || item.notes || item.content || '',
        platform: (item.platform?.toLowerCase() === 'email' ? 'email' : 
                  item.platform?.toLowerCase() === 'blog' ? 'blog' : 'social') as any,
        scheduledDate: item['scheduled date'] || item.date || item.start || item['start date'] 
          ? new Date(item['scheduled date'] || item.date || item.start || item['start date'])
          : new Date(),
        status: (item.status?.toLowerCase() === 'posted' ? 'posted' :
                item.status?.toLowerCase() === 'scheduled' ? 'scheduled' : 'draft') as any
      };
      
      items.push(mappedItem);
    }
    
    return items;
  };

  const parseICS = (content: string): ImportedItem[] => {
    const items: ImportedItem[] = [];
    const events = content.split('BEGIN:VEVENT');
    
    for (let i = 1; i < events.length; i++) {
      const event = events[i];
      const lines = event.split('\n').map(line => line.trim());
      
      let title = '';
      let description = '';
      let startDate = new Date();
      let platform: 'social' | 'email' | 'blog' = 'social';
      
      lines.forEach(line => {
        if (line.startsWith('SUMMARY:')) {
          title = line.replace('SUMMARY:', '').trim();
        } else if (line.startsWith('DESCRIPTION:')) {
          description = line.replace('DESCRIPTION:', '').trim();
        } else if (line.startsWith('DTSTART:')) {
          const dateStr = line.replace('DTSTART:', '').trim();
          try {
            // Parse ICS date format (YYYYMMDDTHHMMSSZ)
            if (dateStr.includes('T')) {
              const [datePart, timePart] = dateStr.split('T');
              const year = parseInt(datePart.substr(0, 4));
              const month = parseInt(datePart.substr(4, 2)) - 1;
              const day = parseInt(datePart.substr(6, 2));
              const hour = parseInt(timePart.substr(0, 2));
              const minute = parseInt(timePart.substr(2, 2));
              startDate = new Date(year, month, day, hour, minute);
            } else {
              startDate = new Date(dateStr);
            }
          } catch (e) {
            startDate = new Date();
          }
        } else if (line.startsWith('CATEGORIES:')) {
          const category = line.replace('CATEGORIES:', '').trim().toLowerCase();
          if (category.includes('email')) platform = 'email';
          else if (category.includes('blog')) platform = 'blog';
          else platform = 'social';
        }
      });
      
      if (title) {
        items.push({
          title,
          description,
          platform,
          scheduledDate: startDate,
          status: 'scheduled'
        });
      }
    }
    
    return items;
  };

  const parseJSON = (content: string): ImportedItem[] => {
    try {
      const data = JSON.parse(content);
      
      // Handle ContentPro backup format
      if (data.contentItems && Array.isArray(data.contentItems)) {
        return data.contentItems.map((item: any) => ({
          title: item.title,
          description: item.description || '',
          platform: item.platform || 'social',
          scheduledDate: new Date(item.scheduledDate || item.date),
          status: item.status || 'draft'
        }));
      }
      
      // Handle generic JSON array
      if (Array.isArray(data)) {
        return data.map((item: any) => ({
          title: item.title || item.name || item.summary || 'Imported Item',
          description: item.description || item.content || item.notes || '',
          platform: (item.platform || item.type || 'social') as any,
          scheduledDate: new Date(item.scheduledDate || item.date || item.start),
          status: (item.status || 'draft') as any
        }));
      }
      
      return [];
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  };

  const processFile = async (file: File) => {
    setIsImporting(true);
    setImportProgress(0);
    setImportResults(null);

    try {
      const content = await file.text();
      let items: ImportedItem[] = [];
      
      if (file.name.endsWith('.csv')) {
        items = parseCSV(content);
      } else if (file.name.endsWith('.ics')) {
        items = parseICS(content);
      } else if (file.name.endsWith('.json')) {
        items = parseJSON(content);
      } else {
        throw new Error('Unsupported file format. Please use CSV, ICS, or JSON files.');
      }

      if (items.length === 0) {
        throw new Error('No valid content items found in the file.');
      }

      // Import items one by one with progress updates
      let successCount = 0;
      const errors: string[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setImportProgress(((i + 1) / items.length) * 100);
        
        try {
          await createMutation.mutateAsync({
            title: item.title,
            description: item.description || null,
            platform: item.platform,
            scheduledDate: item.scheduledDate,
            status: item.status
          });
          successCount++;
        } catch (error) {
          errors.push(`Failed to import "${item.title}": ${error}`);
        }
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setImportResults({
        success: successCount,
        errors,
        imported: items.slice(0, successCount)
      });

      if (successCount > 0) {
        toast.success(`🎉 Successfully imported ${successCount} content items!`);
        onImportComplete?.(successCount);
      }

      if (errors.length > 0) {
        toast.error(`⚠️ ${errors.length} items failed to import. Check the results for details.`);
      }

    } catch (error) {
      toast.error(`Import failed: ${error}`);
      setImportResults({
        success: 0,
        errors: [String(error)],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.size > maxSize) {
      toast.error('File too large. Please select a file smaller than 10MB.');
      return;
    }
    
    const supportedTypes = ['.csv', '.ics', '.json'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!supportedTypes.includes(fileExtension)) {
      toast.error('Unsupported file type. Please select a CSV, ICS, or JSON file.');
      return;
    }
    
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Calendar Data
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Import content from CSV files, ICS calendar files, or JSON backups.
          </p>
        </CardHeader>
        <CardContent>
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div>
                <p className="text-lg font-medium">Drop your file here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="mt-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select File
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.ics,.json"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              
              <div className="flex space-x-4 text-xs text-muted-foreground">
                <Badge variant="outline">CSV</Badge>
                <Badge variant="outline">ICS</Badge>
                <Badge variant="outline">JSON</Badge>
              </div>
            </div>
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Importing content...</span>
                <span className="text-sm text-muted-foreground">{Math.round(importProgress)}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {/* Import Results */}
          {importResults && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                {importResults.success > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  Import Complete: {importResults.success} items imported
                </span>
              </div>

              {importResults.errors.length > 0 && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Import Errors ({importResults.errors.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {importResults.errors.map((error, index) => (
                        <p key={index} className="text-xs text-red-600 dark:text-red-400">
                          {error}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Supported Formats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p><strong>CSV Files:</strong> Headers: Title, Description, Platform, Status, Scheduled Date</p>
            <p className="text-muted-foreground">Platform values: social, email, blog</p>
          </div>
          <div>
            <p><strong>ICS Calendar:</strong> Standard calendar format from Google Calendar, Outlook, etc.</p>
            <p className="text-muted-foreground">Events will be imported as scheduled content items</p>
          </div>
          <div>
            <p><strong>JSON Backup:</strong> ContentPro backup files or custom JSON with content structure</p>
            <p className="text-muted-foreground">Use this for complete data migration or backup restoration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}