"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Calendar,
  Link as LinkIcon,
  TrendingUp,
  Loader2,
  AlertCircle,
  Copy,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetShortUrlStats } from "@/hooks/useURLShortener";

export default function Stats() {
  const { token } = useParams<{ token: string }>();
  const { data: apiData, isLoading, error } = useGetShortUrlStats(token);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <LinkIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShortLink Analytics
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-lg font-medium text-gray-700">
                    Loading statistics...
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please wait while we fetch your data
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShortLink Analytics
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {apiData ? (
            <div className="space-y-6">
              {/* Header Stats */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Link Analytics
                </h2>
                <p className="text-gray-600">
                  Performance metrics for your shortened URL
                </p>
              </div>

              {/* Quick Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Clicks
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                          {apiData.clickCount}
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Status
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-1 bg-green-100 text-green-700"
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Created
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatDate(apiData.createdAt).split(",")[0]}
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* URL Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    URL Details
                  </CardTitle>
                  <CardDescription>
                    Information about your shortened link
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Short URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Short URL
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 p-3 rounded-lg border">
                        <p className="font-mono text-blue-600 break-all">
                          {`${window.location.protocol}//${window.location.host}/${apiData.token}`}
                        </p>
                      </div>
                      {apiData && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleCopy(
                              `${window.location.protocol}//${window.location.host}/${apiData.token}`
                            )
                          }
                          className="shrink-0"
                        >
                          {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Original URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Original URL
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 p-3 rounded-lg border">
                        <p className="text-gray-800 break-all">
                          {apiData.originalUrl}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="shrink-0"
                      >
                        <a
                          href={apiData.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Creation Date */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Created On
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-800">
                        {formatDate(apiData.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Link href="/">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Create New Link
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href={apiData.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Original URL
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Error State */
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Link Not Found
                  </h3>
                  <Alert
                    variant="destructive"
                    className="max-w-md mx-auto mb-6"
                  >
                    <AlertDescription>
                      {error?.message ||
                        "The requested short URL could not be found."}
                    </AlertDescription>
                  </Alert>
                  <p className="text-gray-600 mb-6">
                    The link you&apos;re looking for doesn&apos;t exist or may
                    have been removed.
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Create a New Link
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
