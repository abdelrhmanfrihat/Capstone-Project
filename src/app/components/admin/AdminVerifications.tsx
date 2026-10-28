import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, Badge, Button, Input, Select, StatusBadge } from '../shared/ui';
import { mockData } from '../mockData';

export const AdminVerifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Company Verification Requests</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Review and approve company accounts to ensure platform safety.</p>
        </div>
      </div>

      <Card className="p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="pl-10" placeholder="Search companies..." />
        </div>
        <div className="w-48">
          <Select>
            <option>Status: Pending</option>
            <option>Status: Verified</option>
            <option>Status: Rejected</option>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden border border-border dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background dark:bg-gray-800/50 border-b border-border dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold text-foreground dark:text-white">Company</th>
                <th className="px-6 py-4 font-semibold text-foreground dark:text-white">Type</th>
                <th className="px-6 py-4 font-semibold text-foreground dark:text-white">Risk Indicator</th>
                <th className="px-6 py-4 font-semibold text-foreground dark:text-white">Status</th>
                <th className="px-6 py-4 font-semibold text-foreground dark:text-white text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockData.companies.map(company => (
                <tr key={company.id} className="hover:bg-background/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={company.logo} alt="" className="w-8 h-8 rounded border border-border dark:border-gray-700" />
                      <div className="font-semibold text-foreground dark:text-white">{company.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground dark:text-gray-400">{company.type}</td>
                  <td className="px-6 py-4">
                    {company.status === 'Pending' ? (
                      <span className="flex items-center gap-1.5 text-amber-700 dark:text-yellow-500 font-medium">
                        <AlertTriangle className="w-4 h-4" /> Medium
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-medium">
                        <CheckCircle className="w-4 h-4" /> Low
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={company.status} tone="admin" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {company.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                        <Button size="sm" variant="danger">Reject</Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline">View Details</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
