/**
 * Billing history component for displaying past invoices and transactions
 */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Check, AlertCircle } from "lucide-react";

// Mock data for billing history
const mockInvoices = [
  {
    id: "INV-001",
    date: "2023-05-15",
    amount: "$19.00",
    status: "paid",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
  {
    id: "INV-002",
    date: "2023-06-15",
    amount: "$19.00",
    status: "paid",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
  {
    id: "INV-003",
    date: "2023-07-15",
    amount: "$19.00",
    status: "paid",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
  {
    id: "INV-004",
    date: "2023-08-15",
    amount: "$19.00",
    status: "pending",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
];

export function BillingHistory() {
  const [invoices] = useState(mockInvoices);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status icon based on payment status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your past invoices and payment history.</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">Invoice</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b">
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{invoice.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="px-4 py-3">{invoice.amount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(invoice.status)}
                          <span className="capitalize">{invoice.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(invoice.downloadUrl, "_blank")}
                        >
                          <span className="sr-only">Download</span>
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            No billing history available.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 