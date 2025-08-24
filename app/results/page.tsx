"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MatrixRain from "@/components/matrix-rain"

interface AnalysisData {
  name: string
  ticker: string
  description: string
  picture: string | null // Updated to only handle string (base64) or null
  twitterLink: string
  telegramLink: string
  websiteLink: string
}

export default function ResultsPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Mock analysis results
  const [results, setResults] = useState({
    memeQuality: {
      theme: 0,
      humor: 0,
      originality: 0,
      culturalRelevance: 0,
      visualIdentity: 0,
      overall: 0,
    },
    tickerStrength: {
      catchy: 0,
      length: 0,
      relevance: 0,
      redFlags: 0,
      overall: 0,
    },
    communityStrength: {
      website: 0,
      social: 0,
      engagement: 0,
      overall: 0,
    },
    trustSignals: {
      transparency: 0,
      roadmap: 0,
      audit: 0,
      team: 0,
      overall: 0,
    },
    marketCapPotential: {
      conservative: 0,
      moderate: 0,
      optimistic: 0,
      riskLevel: "medium" as "low" | "medium" | "high",
      timeframe: "6-12 months",
      comparableTokens: [] as string[],
    },
    overallRating: {
      memeStrength: 0,
      tickerStrength: 0,
      communityStrength: 0,
      legitFactor: "red" as "green" | "yellow" | "red",
    },
  })

  useEffect(() => {
    // Get data from localStorage or URL params
    const storedData = localStorage.getItem("submissionData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setAnalysisData(parsedData)
      console.log("[v0] Analysis data loaded:", parsedData)
    } else {
      console.log("[v0] No submission data found in localStorage")
    }
  }, [])

  useEffect(() => {
    if (!analysisData) return

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsAnalyzing(false)
          generateAnalysis()
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [analysisData]) // Depend on analysisData

  const generateAnalysis = () => {
    console.log("[v0] Starting analysis generation")
    if (!analysisData) {
      console.log("[v0] No analysis data available")
      return
    }

    console.log("[v0] Generating analysis for:", analysisData.name)

    const memeQuality = {
      theme: Math.floor(Math.random() * 5) + 1, // 1-5
      humor: Math.floor(Math.random() * 5) + 1, // 1-5
      originality: Math.floor(Math.random() * 5) + 1, // 1-5
      culturalRelevance: Math.floor(Math.random() * 5) + 1, // 1-5
      visualIdentity: analysisData.picture ? Math.floor(Math.random() * 2) + 4 : Math.floor(Math.random() * 3) + 1, // 4-5 with image, 1-3 without
      overall: 0,
    }
    memeQuality.overall = Math.round(
      (memeQuality.theme +
        memeQuality.humor +
        memeQuality.originality +
        memeQuality.culturalRelevance +
        memeQuality.visualIdentity) /
        5,
    )

    const tickerStrength = {
      catchy: Math.floor(Math.random() * 5) + 1, // 1-5
      length: Math.floor(Math.random() * 5) + 1, // 1-5
      relevance: Math.floor(Math.random() * 5) + 1, // 1-5
      redFlags: Math.floor(Math.random() * 5) + 1, // 1-5
      overall: 0,
    }
    tickerStrength.overall = Math.round(
      (tickerStrength.catchy + tickerStrength.length + tickerStrength.relevance + tickerStrength.redFlags) / 4,
    )

    const hasWebsite = !!analysisData.websiteLink
    const hasTwitter = !!analysisData.twitterLink
    const hasTelegram = !!analysisData.telegramLink
    const socialCount = (hasTwitter ? 1 : 0) + (hasTelegram ? 1 : 0)

    const communityStrength = {
      website: hasWebsite ? Math.floor(Math.random() * 2) + 4 : Math.floor(Math.random() * 2) + 1, // 4-5 with website, 1-2 without
      social:
        socialCount === 2
          ? Math.floor(Math.random() * 2) + 4
          : socialCount === 1
            ? Math.floor(Math.random() * 2) + 3
            : Math.floor(Math.random() * 2) + 1, // Based on social links
      engagement: Math.floor(Math.random() * 5) + 1, // 1-5 random
      overall: 0,
    }
    communityStrength.overall = Math.round(
      (communityStrength.website + communityStrength.social + communityStrength.engagement) / 3,
    )

    const trustSignals = {
      transparency: Math.floor(Math.random() * 5) + 1, // 1-5
      roadmap: Math.floor(Math.random() * 5) + 1, // 1-5
      audit: Math.floor(Math.random() * 5) + 1, // 1-5
      team: Math.floor(Math.random() * 5) + 1, // 1-5
      overall: 0,
    }
    trustSignals.overall = Math.round(
      (trustSignals.transparency + trustSignals.roadmap + trustSignals.audit + trustSignals.team) / 4,
    )

    const marketCapPotential = {
      conservative: Math.floor(Math.random() * 500000) + 50000, // 50K - 550K
      moderate: Math.floor(Math.random() * 5000000) + 500000, // 500K - 5.5M
      optimistic: Math.floor(Math.random() * 50000000) + 5000000, // 5M - 55M
      riskLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
      timeframe: ["2-4 months", "3-6 months", "6-9 months", "6-12 months", "12-18 months", "18-24 months"][
        Math.floor(Math.random() * 6)
      ],
      comparableTokens: getRandomComparableTokens(),
    }

    const overallRating = {
      memeStrength: memeQuality.overall,
      tickerStrength: tickerStrength.overall,
      communityStrength: communityStrength.overall,
      legitFactor: ["green", "yellow", "red"][Math.floor(Math.random() * 3)] as "green" | "yellow" | "red",
    }

    console.log("[v0] Generated analysis:", {
      memeQuality,
      tickerStrength,
      communityStrength,
      trustSignals,
      marketCapPotential,
      overallRating,
    })

    console.log("[v0] Setting results state with overall scores:", {
      memeOverall: memeQuality.overall,
      tickerOverall: tickerStrength.overall,
      communityOverall: communityStrength.overall,
    })

    setResults({
      memeQuality,
      tickerStrength,
      communityStrength,
      trustSignals,
      marketCapPotential,
      overallRating,
    })
  }

  const getRandomComparableTokens = () => {
    const allTokens = [
      "DOGE",
      "SHIB",
      "PEPE",
      "FLOKI",
      "BONK",
      "WIF",
      "POPCAT",
      "BRETT",
      "MOG",
      "TURBO",
      "NEIRO",
      "GOAT",
      "PNUT",
      "FARTCOIN",
      "CHILLGUY",
      "PONKE",
      "MYRO",
      "BOME",
      "SLERF",
      "MEW",
    ]

    const numTokens = Math.floor(Math.random() * 3) + 2 // 2-4 tokens
    const shuffled = allTokens.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numTokens)
  }

  const renderStars = (rating: number) => {
    console.log("[v0] Rendering stars for rating:", rating)
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="text-cyan-400">
        ⭐
      </span>
    ))
  }

  const getLegitFactorColor = (factor: string) => {
    switch (factor) {
      case "green":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "yellow":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "red":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background retro-grid relative flex items-center justify-center">
        <MatrixRain />
        <Card className="neon-border bg-card/30 backdrop-blur-sm p-8 relative z-10">
          <div className="font-mono text-center">
            <div className="neon-text text-xl mb-4">&gt; NO_DATA_FOUND</div>
            <div className="text-muted-foreground mb-4">&gt; Please submit a token for analysis first</div>
            <a href="/submit" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              &gt; GO_TO_SUBMISSION_FORM
            </a>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background retro-grid relative">
      <MatrixRain />

      {/* Header */}
      <div className="neon-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="font-mono text-sm space-y-1">
            <div className="flex justify-between items-center">
              <span className="neon-text">&gt; MEMECOIN_ANALYSIS_RESULTS</span>
              <div className="flex items-center gap-4">
                <a href="/" className="text-cyan-300 transition-all duration-300 font-mono text-sm">
                  &lt; BACK_TO_MAIN
                </a>
                <a
                  href="https://x.com/Cira_Ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 transition-all duration-300 scale-110 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] p-2 rounded-full bg-cyan-500/10"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="drop-shadow-[0_0_4px_rgba(0,255,255,0.4)]"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="neon-text">
              &gt; Token: {analysisData.name} ({analysisData.ticker})
            </div>
            <div className="text-muted-foreground">&gt; Analysis Status: {isAnalyzing ? "PROCESSING" : "COMPLETE"}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {isAnalyzing ? (
          <div className="max-w-4xl mx-auto">
            <Card className="neon-border bg-card/30 backdrop-blur-sm p-8">
              <div className="text-center space-y-6">
                <div className="font-mono text-2xl neon-text">&gt; ANALYZING_TOKEN_DATA</div>
                <div className="font-mono text-lg text-muted-foreground">
                  &gt; Processing: {analysisData.name} ({analysisData.ticker})
                </div>
                <div className="w-full bg-card/50 rounded-full h-4 neon-border">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <div className="font-mono text-sm neon-text">&gt; Progress: {analysisProgress}%</div>
                <div className="font-mono text-sm text-muted-foreground space-y-1">
                  <div>&gt; Analyzing meme quality...</div>
                  <div>&gt; Checking ticker strength...</div>
                  <div>&gt; Evaluating community presence...</div>
                  <div>&gt; Assessing trust signals...</div>
                  <div>&gt; Estimating market cap potential...</div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Token Overview */}
            <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
              <div className="flex items-start gap-6">
                {analysisData.picture && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden neon-border">
                    <img
                      src={analysisData.picture || "/placeholder.svg?height=96&width=96&query=token logo"}
                      alt={analysisData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/generic-token-logo.png"
                      }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="font-mono text-3xl neon-text mb-2">{analysisData.name}</h1>
                  <div className="font-mono text-xl text-cyan-400 mb-4">${analysisData.ticker}</div>
                  <p className="font-mono text-sm text-muted-foreground">{analysisData.description}</p>
                </div>
              </div>
            </Card>

            {/* Analysis Results Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Meme Quality */}
              <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
                <h2 className="font-mono text-xl neon-text mb-4">&gt; MEME_QUALITY_ANALYSIS</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Theme Strength:</span>
                    <div className="flex">{renderStars(results.memeQuality.theme)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Humor Factor:</span>
                    <div className="flex">{renderStars(results.memeQuality.humor)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Originality:</span>
                    <div className="flex">{renderStars(results.memeQuality.originality)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Cultural Relevance:</span>
                    <div className="flex">{renderStars(results.memeQuality.culturalRelevance)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Visual Identity:</span>
                    <div className="flex">{renderStars(results.memeQuality.visualIdentity)}</div>
                  </div>
                  <div className="border-t border-cyan-400/30 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold neon-text">Overall Score:</span>
                      <div className="flex">{renderStars(results.memeQuality.overall)}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Ticker Analysis */}
              <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
                <h2 className="font-mono text-xl neon-text mb-4">&gt; TICKER_ANALYSIS</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Catchiness:</span>
                    <div className="flex">{renderStars(results.tickerStrength.catchy)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Length Optimization:</span>
                    <div className="flex">{renderStars(results.tickerStrength.length)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Brand Relevance:</span>
                    <div className="flex">{renderStars(results.tickerStrength.relevance)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Red Flag Check:</span>
                    <div className="flex">{renderStars(results.tickerStrength.redFlags)}</div>
                  </div>
                  <div className="border-t border-cyan-400/30 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold neon-text">Overall Score:</span>
                      <div className="flex">{renderStars(results.tickerStrength.overall)}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Community & Links */}
              <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
                <h2 className="font-mono text-xl neon-text mb-4">&gt; COMMUNITY_ANALYSIS</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Website Presence:</span>
                    <div className="flex">{renderStars(results.communityStrength.website)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Social Media:</span>
                    <div className="flex">{renderStars(results.communityStrength.social)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Engagement Potential:</span>
                    <div className="flex">{renderStars(results.communityStrength.engagement)}</div>
                  </div>
                  <div className="border-t border-cyan-400/30 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold neon-text">Overall Score:</span>
                      <div className="flex">{renderStars(results.communityStrength.overall)}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="font-mono text-xs text-muted-foreground">&gt; Social Links Found:</div>
                    {analysisData.websiteLink && (
                      <Badge variant="outline" className="font-mono text-xs">
                        Website
                      </Badge>
                    )}
                    {analysisData.twitterLink && (
                      <Badge variant="outline" className="font-mono text-xs">
                        Twitter/X
                      </Badge>
                    )}
                    {analysisData.telegramLink && (
                      <Badge variant="outline" className="font-mono text-xs">
                        Telegram
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* Trust Signals */}
              <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
                <h2 className="font-mono text-xl neon-text mb-4">&gt; TRUST_SIGNALS</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Transparency:</span>
                    <div className="flex">{renderStars(results.trustSignals.transparency)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Roadmap/Whitepaper:</span>
                    <div className="flex">{renderStars(results.trustSignals.roadmap)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Audit Status:</span>
                    <div className="flex">{renderStars(results.trustSignals.audit)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Team Visibility:</span>
                    <div className="flex">{renderStars(results.trustSignals.team)}</div>
                  </div>
                  <div className="border-t border-cyan-400/30 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold neon-text">Overall Score:</span>
                      <div className="flex">{renderStars(results.trustSignals.overall)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Market Cap Potential Analysis */}
            <Card className="neon-border bg-card/30 backdrop-blur-sm p-6">
              <h2 className="font-mono text-xl neon-text mb-6">&gt; MARKET_CAP_POTENTIAL</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Conservative</div>
                  <div className="font-mono text-2xl neon-text mb-2">
                    {formatMarketCap(results.marketCapPotential.conservative)}
                  </div>
                  <div className="font-mono text-xs text-gray-400">Low-risk scenario</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Moderate</div>
                  <div className="font-mono text-2xl text-cyan-400 mb-2">
                    {formatMarketCap(results.marketCapPotential.moderate)}
                  </div>
                  <div className="font-mono text-xs text-gray-400">Expected scenario</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Optimistic</div>
                  <div className="font-mono text-2xl text-green-400 mb-2">
                    {formatMarketCap(results.marketCapPotential.optimistic)}
                  </div>
                  <div className="font-mono text-xs text-gray-400">Bull market scenario</div>
                </div>
              </div>

              <div className="border-t border-cyan-400/30 pt-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-sm text-muted-foreground mb-3">&gt; Risk Assessment</div>
                    <Badge className={`font-mono ${getRiskLevelColor(results.marketCapPotential.riskLevel)}`}>
                      {results.marketCapPotential.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <div className="font-mono text-xs text-gray-400 mt-2">
                      Timeframe: {results.marketCapPotential.timeframe}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-muted-foreground mb-3">&gt; Comparable Tokens</div>
                    <div className="flex flex-wrap gap-2">
                      {results.marketCapPotential.comparableTokens.map((token, index) => (
                        <Badge key={index} variant="outline" className="font-mono text-xs">
                          ${token}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-400/30 pt-4 mt-4">
                <div className="font-mono text-xs text-gray-400 space-y-1">
                  <div>&gt; Projections based on meme strength, community size, and market conditions</div>
                  <div>&gt; Past performance does not guarantee future results</div>
                  <div>&gt; Cryptocurrency investments carry high risk</div>
                </div>
              </div>
            </Card>

            {/* Overall Verdict */}
            <Card className="neon-border bg-card/30 backdrop-blur-sm p-8">
              <h2 className="font-mono text-2xl neon-text mb-6 text-center">&gt; OVERALL_VERDICT</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Meme Strength</div>
                  <div className="flex justify-center mb-2">{renderStars(results.memeQuality.overall)}</div>
                  <div className="font-mono text-lg neon-text">{results.memeQuality.overall}/5</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Ticker Strength</div>
                  <div className="flex justify-center mb-2">{renderStars(results.tickerStrength.overall)}</div>
                  <div className="font-mono text-lg neon-text">{results.tickerStrength.overall}/5</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Community Strength</div>
                  <div className="flex justify-center mb-2">{renderStars(results.communityStrength.overall)}</div>
                  <div className="font-mono text-lg neon-text">{results.communityStrength.overall}/5</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Legit Factor</div>
                  <Badge
                    className={`font-mono text-lg px-4 py-2 ${getLegitFactorColor(results.overallRating.legitFactor)}`}
                  >
                    {results.overallRating.legitFactor.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <a
                href="/submit"
                className="font-mono bg-cyan-500/20 text-cyan-400 px-6 py-3 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-300"
              >
                ANALYZE_ANOTHER_TOKEN
              </a>
              <a
                href="/"
                className="font-mono bg-card/50 text-muted-foreground px-6 py-3 rounded-lg border border-gray-400/30 hover:bg-card/70 transition-all duration-300"
              >
                BACK_TO_DASHBOARD
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
