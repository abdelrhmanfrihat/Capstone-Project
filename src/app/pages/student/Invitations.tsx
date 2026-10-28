import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MatchScore } from "../../components/ui/MatchScore";
import { Mail, Clock, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export function StudentInvitations({ hideHeader = false }: { hideHeader?: boolean }) {
  const invitations = [
    {
      id: 1,
      company: "Stellar Cloud",
      role: "Frontend Engineering Intern",
      matchScore: 94,
      invitedAt: "2026-05-16",
      expiresAt: "2026-05-23",
      status: "pending",
      message: "We were impressed by your React portfolio and would love to interview you for this role.",
      priority: true
    },
    {
      id: 2,
      company: "InnovateLabs",
      role: "Full Stack Developer Intern",
      matchScore: 88,
      invitedAt: "2026-05-15",
      expiresAt: "2026-05-22",
      status: "pending",
      message: "Your profile shows strong potential. We'd like to invite you to our fast-track interview process.",
      priority: false
    },
    {
      id: 3,
      company: "TechNova",
      role: "UI/UX Engineering Intern",
      matchScore: 91,
      invitedAt: "2026-05-10",
      expiresAt: "2026-05-17",
      status: "accepted",
      message: "Your design-focused frontend skills are exactly what we're looking for.",
      priority: false
    }
  ];

  const pendingCount = invitations.filter(i => i.status === "pending").length;
  const acceptedCount = invitations.filter(i => i.status === "accepted").length;

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div>
          <h1 className="text-2xl font-bold">Company Invitations</h1>
          <p className="text-[var(--text-muted)]">Companies that want to interview you based on your profile.</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Total Invitations</p>
                <p className="text-2xl font-bold">{invitations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Accepted</p>
                <p className="text-2xl font-bold">{acceptedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invitations List */}
      <div className="space-y-4">
        <h3 className="font-bold">All Invitations</h3>

        {invitations.map((invitation) => (
          <Card
            key={invitation.id}
            className={`${
              invitation.priority
                ? "border-2 border-blue-400 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-900/10"
                : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{invitation.company}</h3>
                        {invitation.priority && (
                          <Badge variant="blue" className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Priority
                          </Badge>
                        )}
                        {invitation.status === "pending" && (
                          <Badge variant="warning">Pending</Badge>
                        )}
                        {invitation.status === "accepted" && (
                          <Badge variant="success">Accepted</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mb-1">{invitation.role}</p>
                      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                        <span>Invited: {invitation.invitedAt}</span>
                        <span className={invitation.status === "pending" ? "text-amber-700 dark:text-orange-400 font-semibold" : ""}>
                          Expires: {invitation.expiresAt}
                        </span>
                      </div>
                    </div>
                    <MatchScore score={invitation.matchScore} />
                  </div>

                  <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg border border-[var(--border-main)]">
                    <p className="text-sm italic text-[var(--text-muted)]">"{invitation.message}"</p>
                  </div>

                  {invitation.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Accept Invitation
                      </Button>
                      <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
