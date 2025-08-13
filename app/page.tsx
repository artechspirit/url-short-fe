"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Link as LinkIcon,
  Copy,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useCreateShortenerUrl } from "@/hooks/useURLShortener";

export default function Index() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const {
    mutate,
    data: result,
    isPending,
    error,
    reset,
  } = useCreateShortenerUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    mutate(url);
  };

  const handleCopy = async () => {
    if (result?.token) {
      await navigator.clipboard.writeText(
        `${window.location.href}${result.token}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setUrl("");
    reset();
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <LinkIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShortLink
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shorten Your URLs
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Instantly
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
              Transform long URLs into short, shareable links with detailed
              analytics and tracking.
            </p>
          </div>

          {/* URL Shortener Form */}
          {!result && (
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Create Short Link
                </CardTitle>
                <CardDescription>
                  Enter a long URL to create a shortened version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL to shorten</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://microsoft.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isPending}
                      className="text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending || !url.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Shortening...
                      </>
                    ) : (
                      <>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Shorten URL
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {result && (
            <Card className="mb-8 shadow-lg">
              <CardContent className="pt-6">
                {!error ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-green-700 mb-2">
                        Success! Your short URL is ready
                      </h3>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-700">
                        Short URL
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={`${window.location.href}${result.token}`}
                          readOnly
                          className="bg-white font-mono text-blue-600"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="shrink-0"
                        >
                          {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0"
                        >
                          <a
                            href={`${window.location.href}${result.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link href={`/stats/${result.token}`} target="_blank">
                          <BarChart3 className="h-4 w-4" />
                          View Analytics
                        </Link>
                      </Button>
                      <Button variant="ghost" onClick={handleReset}>
                        Create Another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {error.message || "Failed to shorten URL"}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Features Section */}
          <div id="features" className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <LinkIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Instant Shortening</h3>
                <p className="text-sm text-gray-600">
                  Create short links in seconds with our fast and reliable
                  service
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Detailed Analytics</h3>
                <p className="text-sm text-gray-600">
                  Track clicks and analyze your link performance with detailed
                  statistics
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Copy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Easy Sharing</h3>
                <p className="text-sm text-gray-600">
                  Copy and share your short links anywhere with just one click
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2025 ShortLink. Built with React, TypeScript, and
              shadcn/ui.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
