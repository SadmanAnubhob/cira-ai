"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CoinAnalysis {
  name: string
  ticker: string
  price: number
  marketCap: number
  sentiment: {
    score: number
    label: "Bullish" | "Bearish" | "Neutral"
    confidence: number
  }
  riskAssessment: {
    level: "High" | "Medium" | "Low"
    factors: string[]
  }
  prediction: {
    shortTerm: number
    mediumTerm: number
    longTerm: number
  }
  technicalIndicators: {
    rsi: number
    macd: number
    support: number
    resistance: number
  }
}

export default function CoinAnalysisPage() {
  const params = useParams()
  const coin = params.coin as string
  const [analysis, setAnalysis] = useState<CoinAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call for coin analysis
    const fetchAnalysis = async () => {
      setLoading(true)
      // Mock data - in real app, this would be an API call
      const mockAnalysis: CoinAnalysis = {
        name: coin === "fartcoin" ? "Fartcoin" : coin === "alchemist-ai" ? "Alchemist AI" : "GOAT",
        ticker: coin === "fartcoin" ? "FARTCOIN" : coin === "alchemist-ai" ? "AI" : "GOAT",
        price: coin === "fartcoin" ? 0.000234 : coin === "alchemist-ai" ? 0.0456 : 0.789,
        marketCap: coin === "fartcoin" ? 12500000 : coin === "alchemist-ai" ? 45600000 : 234500000,
        sentiment: {
          score: coin === "fartcoin" ? 75 : coin === "alchemist-ai" ? 85 : 65,
          label: coin === "fartcoin" ? "Bullish" : coin === "alchemist-ai" ? "Bullish" : "Neutral",
          confidence: coin === "fartcoin" ? 82 : coin === "alchemist-ai" ? 91 : 74,
        },
        riskAssessment: {
          level: coin === "fartcoin" ? "High" : coin === "alchemist-ai" ? "Medium" : "Medium",
          factors:
            coin === "fartcoin"
              ? ["High volatility", "Low market cap", "Meme coin nature"]
              : coin === "alchemist-ai"
                ? ["AI sector growth", "Medium liquidity", "Tech innovation"]
                : ["Established community", "Moderate volatility", "Growing adoption"],
        },
        prediction: {
          shortTerm: coin === "fartcoin" ? 15 : coin === "alchemist-ai" ? 25 : 8,
          mediumTerm: coin === "fartcoin" ? 45 : coin === "alchemist-ai" ? 60 : 20,
          longTerm: coin === "fartcoin" ? -20 : coin === "alchemist-ai" ? 120 : 35,
        },
        technicalIndicators: {
          rsi: coin === "fartcoin" ? 68 : coin === "alchemist-ai" ? 45 : 55,
          macd: coin === "fartcoin" ? 0.0012 : coin === "alchemist-ai" ? 0.0034 : 0.0021,
          support: coin === "fartcoin" ? 0.000198 : coin === "alchemist-ai" ? 0.0389 : 0.712,
          resistance: coin === "fartcoin" ? 0.000267 : coin === "alchemist-ai" ? 0.0523 : 0.834,
        },
      }

      setTimeout(() => {
        setAnalysis(mockAnalysis)
        setLoading(false)
      }, 1500)
    }

    fetchAnalysis()
  }, [coin])

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "Bullish":
        return "text-green-400"
      case "Bearish":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-400"
      case "Medium":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl mb-4">{"> ANALYZING_MEMECOIN_DATA..."}</div>
            <div className="w-64 mx-auto">
              <Progress value={75} className="h-2" />
            </div>
            <div className="mt-4 text-sm">{"> PROCESSING_MARKET_SENTIMENT..."}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-red-400 font-mono">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl mb-4">{"> ERROR: COIN_NOT_FOUND"}</div>
            <a href="/" className="text-cyan-400 hover:text-cyan-300">
              {"< RETURN_TO_MAIN"}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Header */}
      <div className="border-2 border-cyan-400 p-4 m-4 bg-black/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="text-cyan-400">
            <span className="text-sm">{"> CIRA_ANALYSIS_TERMINAL_v2.1"}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-cyan-300 scale-110 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] bg-cyan-500/10 px-3 py-1 rounded transition-all duration-300"
            >
              {"< BACK_TO_MAIN"}
            </a>
            <a
              href="https://x.com/Cira_Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 scale-110 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] bg-cyan-500/10 p-2 rounded transition-all duration-300"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Coin Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#5eeeee" }}>
            {analysis.name.toUpperCase()}
          </h1>
          <div className="text-xl text-cyan-400">{"> DETAILED_ANALYSIS_REPORT"}</div>
        </div>

        {/* Price and Market Cap */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-black/80 border-cyan-400 border-2">
            <CardHeader>
              <CardTitle className="text-cyan-400 font-mono">{"> CURRENT_PRICE"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">${analysis.price.toFixed(6)}</div>
              <div className="text-sm text-gray-400 mt-2">Ticker: {analysis.ticker}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-cyan-400 border-2">
            <CardHeader>
              <CardTitle className="text-cyan-400 font-mono">{"> MARKET_CAP"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">${(analysis.marketCap / 1000000).toFixed(2)}M</div>
              <div className="text-sm text-gray-400 mt-2">Market Capitalization</div>
            </CardContent>
          </Card>
        </div>

        {/* TradingView Chart */}
        <Card className="bg-black/80 border-cyan-400 border-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">{"> MARKET_CHART_ANALYSIS"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <iframe
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${analysis.ticker}USD&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=000000&studies=[]&hideideas=1&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={"mainSeriesProperties.candleStyle.upColor":"00ffff","mainSeriesProperties.candleStyle.downColor":"ff0080","mainSeriesProperties.candleStyle.borderUpColor":"00ffff","mainSeriesProperties.candleStyle.borderDownColor":"ff0080","paneProperties.background":"000000","paneProperties.vertGridProperties.color":"333333","paneProperties.horzGridProperties.color":"333333"}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget_new&utm_campaign=chart&utm_term=${analysis.ticker}USD`}
                className="w-full h-full border-0"
                title={`${analysis.name} Chart`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-black/80 border-cyan-400 border-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">{"> SENTIMENT_ANALYSIS"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  <span className={getSentimentColor(analysis.sentiment.label)}>
                    {analysis.sentiment.label.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Overall Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-green-400">{analysis.sentiment.score}%</div>
                <div className="text-sm text-gray-400">Sentiment Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-cyan-400">{analysis.sentiment.confidence}%</div>
                <div className="text-sm text-gray-400">Confidence Level</div>
              </div>
            </div>
            <div className="mt-6">
              <Progress value={analysis.sentiment.score} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-black/80 border-cyan-400 border-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">{"> RISK_ASSESSMENT"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Badge
                className={`text-lg px-4 py-2 ${getRiskColor(analysis.riskAssessment.level)} bg-transparent border-2`}
              >
                {analysis.riskAssessment.level.toUpperCase()} RISK
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-400 mb-2">Risk Factors:</div>
              {analysis.riskAssessment.factors.map((factor, index) => (
                <div key={index} className="text-green-400">
                  {"> "}
                  {factor}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Predictions */}
        <Card className="bg-black/80 border-cyan-400 border-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">{"> MARKET_PREDICTIONS"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-xl font-bold mb-2 text-yellow-400">
                  {analysis.prediction.shortTerm > 0 ? "+" : ""}
                  {analysis.prediction.shortTerm}%
                </div>
                <div className="text-sm text-gray-400">7 Days</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold mb-2 text-cyan-400">
                  {analysis.prediction.mediumTerm > 0 ? "+" : ""}
                  {analysis.prediction.mediumTerm}%
                </div>
                <div className="text-sm text-gray-400">30 Days</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-xl font-bold mb-2 ${analysis.prediction.longTerm > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {analysis.prediction.longTerm > 0 ? "+" : ""}
                  {analysis.prediction.longTerm}%
                </div>
                <div className="text-sm text-gray-400">90 Days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Indicators */}
        <Card className="bg-black/80 border-cyan-400 border-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">{"> TECHNICAL_INDICATORS"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">RSI:</span>
                  <span className="text-green-400">{analysis.technicalIndicators.rsi}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">MACD:</span>
                  <span className="text-green-400">{analysis.technicalIndicators.macd}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Support:</span>
                  <span className="text-green-400">${analysis.technicalIndicators.support.toFixed(6)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Resistance:</span>
                  <span className="text-red-400">${analysis.technicalIndicators.resistance.toFixed(6)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
