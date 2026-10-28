import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { MatchScore } from "../../components/ui/MatchScore";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_APPLICATIONS, MOCK_STUDENTS } from "../../data/mockData";
import { Calendar, AlertCircle } from "lucide-react";

export function CompanyPipeline() {
  const columns = [
    { id: "Applied", label: "Applied" },
    { id: "Shortlisted", label: "Shortlisted" },
    { id: "Interview", label: "Interview" },
    { id: "Matched", label: "Matched" },
    { id: "In Training", label: "In Training" }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Recruitment Pipeline</h1>
          <p className="text-[var(--text-muted)]">Frontend Engineering Intern • Remote</p>
        </div>
        <Button variant="outline">Switch Role</Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className="w-80 shrink-0 flex flex-col gap-3">
            <div className="flex items-center justify-between font-semibold text-sm text-[var(--text-muted)] px-1">
              <span>{col.label}</span>
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                {MOCK_APPLICATIONS.filter(a => a.status === col.id).length}
              </span>
            </div>
            
            <div className="flex-1 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl p-2 space-y-3 min-h-[200px] border border-transparent border-dashed border-[var(--border-main)]">
              {MOCK_APPLICATIONS.filter(a => a.status === col.id).map(app => {
                const student = MOCK_STUDENTS.find(s => s.id === app.studentId);
                if (!student) return null;
                
                return (
                  <Card key={app.id} className="shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-sm leading-tight flex items-center gap-2">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`} 
                            alt="Avatar" 
                            className="w-6 h-6 rounded-full"
                          />
                          {student.name}
                        </div>
                        <MatchScore score={app.matchScore} showLabel={false} />
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {student.skills.technical.slice(0, 2).map(s => (
                          <Badge key={s.name} variant="outline" className="text-[10px] py-0">{s.name}</Badge>
                        ))}
                      </div>

                      {app.status === "Interview" && (
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md border border-blue-100 dark:border-blue-800 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          May 18, 10:00 AM
                        </div>
                      )}

                      <div className="pt-2 border-t border-[var(--border-main)] flex gap-2">
                        {col.id === "Matched" ? (
                          <Button size="sm" className="w-full text-xs h-7" onClick={() => alert("Warning: Marking as 'In Training' will lock this student.")}>
                            Confirm Training
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="flex-1 text-[10px] h-7 px-0">Profile</Button>
                            <Button size="sm" variant="outline" className="flex-1 text-[10px] h-7 px-0">Message</Button>
                            <Button size="sm" variant="outline" className="flex-1 text-[10px] h-7 px-0 text-blue-600 border-blue-200 hover:bg-blue-50">Move</Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
