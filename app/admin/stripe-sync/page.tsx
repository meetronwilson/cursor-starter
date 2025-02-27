/**
 * Admin page for syncing Stripe data with the database
 */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

// Define types for our state
type SyncResult = {
  subscriptions: number;
  products: number;
  errors: string[];
};

type SyncStats = {
  database: {
    subscriptions: number;
    products: number;
  };
  stripe: {
    subscriptions: number;
    products: number;
  };
};

export default function StripeSyncPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<SyncStats | null>(null);

  // Function to check sync status
  const checkStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/sync-stripe');
      const data = await response.json();
      
      if (data.success) {
        setStats(data);
        setError(null);
      } else {
        setError(data.error || 'Failed to check sync status');
      }
    } catch (err) {
      setError('An error occurred while checking sync status');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to trigger sync
  const triggerSync = async () => {
    try {
      setIsLoading(true);
      setSyncResult(null);
      setError(null);
      
      const response = await fetch('/api/admin/sync-stripe', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSyncResult(data.results);
        // Refresh stats after sync
        checkStatus();
      } else {
        setError(data.error || 'Failed to sync Stripe data');
      }
    } catch (err) {
      setError('An error occurred while syncing Stripe data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load stats on initial render
  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Stripe Sync Admin</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
            <CardDescription>
              Current status of Stripe data synchronization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Database</h3>
                    <p className="text-2xl font-bold">{stats.database.subscriptions} Subscriptions</p>
                    <p className="text-2xl font-bold">{stats.database.products} Products</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Stripe</h3>
                    <p className="text-2xl font-bold">{stats.stripe.subscriptions} Subscriptions</p>
                    <p className="text-2xl font-bold">{stats.stripe.products} Products</p>
                  </div>
                </div>
                
                {stats.database.subscriptions !== stats.stripe.subscriptions && (
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle>Out of Sync</AlertTitle>
                    <AlertDescription>
                      Your database has {stats.database.subscriptions} subscriptions, but Stripe has {stats.stripe.subscriptions}.
                    </AlertDescription>
                  </Alert>
                )}
                
                {stats.database.subscriptions === stats.stripe.subscriptions && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>In Sync</AlertTitle>
                    <AlertDescription>
                      Your database is in sync with Stripe.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                {isLoading ? (
                  <p className="text-muted-foreground">Loading stats...</p>
                ) : (
                  <p className="text-muted-foreground">No stats available</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={checkStatus} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Stats
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sync Stripe Data</CardTitle>
            <CardDescription>
              Manually sync Stripe subscriptions with your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {syncResult && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Sync Completed</AlertTitle>
                <AlertDescription>
                  <p>Synced {syncResult.subscriptions} subscriptions</p>
                  <p>Created {syncResult.products} products</p>
                  {syncResult.errors.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm">
                        {syncResult.errors.length} errors occurred
                      </summary>
                      <ul className="text-xs mt-2 space-y-1">
                        {syncResult.errors.map((err: string, i: number) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            <p className="text-muted-foreground mb-4">
              This will fetch all subscriptions from Stripe and sync them with your database.
              Use this if your database is out of sync with Stripe.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={triggerSync} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Sync Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 