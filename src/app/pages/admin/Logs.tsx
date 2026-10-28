import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { History, Download, User, Building2, Shield } from "lucide-react";

export function AdminLogs() {
  const logs = [
    {
      id: 1,
      action: "User Login",
      user: "Alex Chen",
      userType: "Student",
      details: "Successful login from IP 192.168.1.100",
      timestamp: "2026-05-17 14:32:15",
      severity: "Info"
    },
    {
      id: 2,
      action: "Status Override",
      user: "Admin User",
      userType: "Admin",
      details: "Changed student status from 'In Training' to 'Available'",
      timestamp: "2026-05-17 13:45:22",
      severity: "Warning"
    }
  ];

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case "Admin":
        return <Shield className="w-4 h-4" />;
      case "Company":
        return <Building2 className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-[var(--text-muted)]">System activity and security audit trail.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Timestamp</th>
                  <th className="text-left p-4 text-sm font-semibold">Action</th>
                  <th className="text-left p-4 text-sm font-semibold">User</th>
                  <th className="text-left p-4 text-sm font-semibold">Details</th>
                  <th className="text-left p-4 text-sm font-semibold">Severity</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-[var(--border-main)]">
                    <td className="p-4 text-sm text-[var(--text-muted)]">{log.timestamp}</td>
                    <td className="p-4 font-semibold text-sm">{log.action}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getUserIcon(log.userType)}
                        <span className="text-sm">{log.user}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">{log.details}</td>
                    <td className="p-4">
                      <Badge variant={log.severity === "Warning" ? "warning" : "blue"}>
                        {log.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
