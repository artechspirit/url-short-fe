"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  ExternalLink,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUrlShortenerRedirect } from "@/hooks/useURLShortener";
import { useEffect, useState } from "react";

export default function Redirect() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, error } = useUrlShortenerRedirect(token);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) return;

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer); // bersihkan timeout saat effect re-run atau unmount
  }, [count]);

  useEffect(() => {
    if (!data) return;

    const redirectTimer = setTimeout(() => {
      window.location.href = data.originalUrl;
    }, 3000);

    return () => clearTimeout(redirectTimer); // bersihkan timeout jika data berubah atau unmount
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resolving Short URL
                </h3>
                <p className="text-gray-600">
                  Please wait while we redirect you to your destination...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Link Not Found
                </h3>
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
                <p className="text-gray-600 mb-4">
                  The short URL you&apos;re trying to access doesn&apos;t exist
                  or may have been removed.
                </p>
                <div className="space-y-2">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Create a New Short URL
                    </Link>
                  </Button>
                  {token && (
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/stats/${token}`}>
                        View Stats (if available)
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect found - show redirect message
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <ExternalLink className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Redirecting in {count} seconds...
              </h3>
              <p className="text-gray-600 mb-4">You will be redirected to:</p>
              <div className="bg-gray-50 p-3 rounded-lg border break-all text-sm text-blue-600">
                {data.originalUrl}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                If you&apos;re not redirected automatically, click the link
                above.
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a
                    href={data.originalUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Link
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="flex-1">
                  <Link href="/">Cancel</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
