"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import MatrixRain from "@/components/matrix-rain"

// TradingView Chart Component
function TradingViewChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = ""

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: "100%",
        height: "200",
        locale: "en",
        dateRange: "1D",
        colorTheme: "dark",
        trendLineColor: "#00FFFF",
        underLineColor: "rgba(0, 255, 255, 0.3)",
        underLineBottomColor: "rgba(0, 255, 255, 0)",
        isTransparent: true,
        autosize: true,
        largeChartUrl: "",
      })

      containerRef.current.appendChild(script)
    }
  }, [symbol])

  return <div ref={containerRef} className="tradingview-widget-container" />
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible] as const
}

interface TokenPrice {
  id: string
  current_price: number
  price_change_percentage_24h: number
  image?: string // Added image property to store token image URL
}

export default function HomePage() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [analysisCount, setAnalysisCount] = useState(0)
  const [tokenPrices, setTokenPrices] = useState<Record<string, TokenPrice>>({})

  const [heroRef, heroVisible] = useScrollAnimation()
  const [tokensRef, tokensVisible] = useScrollAnimation()
  const [featuresRef, featuresVisible] = useScrollAnimation()
  const [terminalRef, terminalVisible] = useScrollAnimation()
  const [ctaRef, ctaVisible] = useScrollAnimation()

  const fetchTokenPrices = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=fartcoin,alchemist-ai,goatseus-maximus&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
      )
      const data = await response.json()

      const priceData: Record<string, TokenPrice> = {}

      data.forEach((coin: any) => {
        priceData[coin.id] = {
          id: coin.id,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          image: coin.image, // Store the image URL from API
        }
      })

      setTokenPrices(priceData)
    } catch (error) {
      console.error("Failed to fetch token prices:", error)
    }
  }

  useEffect(() => {
    fetchTokenPrices()
    const priceInterval = setInterval(fetchTokenPrices, 30000) // Update every 30 seconds

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => (prev < 100 ? prev + 1 : 0))
    }, 100)

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    // Simulate analysis count
    const countInterval = setInterval(() => {
      setAnalysisCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
      clearInterval(countInterval)
      clearInterval(priceInterval)
    }
  }, [])

  const formatPrice = (price: number) => {
    if (price < 0.001) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toFixed(4)}`
    }
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  const analyzedTokens = [
    {
      logo: tokenPrices.fartcoin?.image || "/fartcoin-logo.png",
      name: "Fartcoin",
      ticker: "FARTCOIN",
      symbol: "MEXC:FARTCOINUSDT",
      coinId: "fartcoin",
      price: tokenPrices.fartcoin ? formatPrice(tokenPrices.fartcoin.current_price) : "$0.0847",
      change: tokenPrices.fartcoin ? formatChange(tokenPrices.fartcoin.price_change_percentage_24h) : "+12.5%",
      sentiment: "BULLISH",
    },
    {
      logo: tokenPrices["alchemist-ai"]?.image || "/alchemist-ai-logo.png",
      name: "Alchemist AI",
      ticker: "ALCH",
      symbol: "MEXC:ALCHUSDT",
      coinId: "alchemist-ai",
      price: tokenPrices["alchemist-ai"] ? formatPrice(tokenPrices["alchemist-ai"].current_price) : "$0.000001234",
      change: tokenPrices["alchemist-ai"]
        ? formatChange(tokenPrices["alchemist-ai"].price_change_percentage_24h)
        : "-3.2%",
      sentiment: "NEUTRAL",
    },
    {
      logo: tokenPrices["goatseus-maximus"]?.image || "/placeholder-wf7p9.png",
      name: "GOAT",
      ticker: "GOAT",
      symbol: "MEXC:GOATUSDT",
      coinId: "goatseus-maximus",
      price: tokenPrices["goatseus-maximus"]
        ? formatPrice(tokenPrices["goatseus-maximus"].current_price)
        : "$0.000008956",
      change: tokenPrices["goatseus-maximus"]
        ? formatChange(tokenPrices["goatseus-maximus"].price_change_percentage_24h)
        : "+8.7%",
      sentiment: "BULLISH",
    },
  ]

  return (
    <div className="min-h-screen bg-background retro-grid relative">
      <MatrixRain />

      {/* Terminal Header */}
      <div className="neon-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="font-mono text-sm space-y-1">
            <div className="flex justify-between items-center">
              <span className="neon-text">&gt; System Status: ONLINE</span>
              <div className="flex items-center gap-4">
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
                <span className="text-accent">{currentTime}</span>
              </div>
            </div>
            <div className="neon-text">&gt; Memecoin analyses completed today: {analysisCount}</div>
            <div className="text-muted-foreground">&gt; AI Model: CHAT-GPT-4.0 | Made in 2024</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`text-center mb-16 scan-line transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <div className="flex flex-col items-center gap-2">
              <img src="/cira-logo-new.png" alt="Cira Logo" className="w-48 h-48 md:w-64 md:h-64" />
              <h1 className="text-8xl md:text-9xl font-bold" style={{ color: "#5eeeee" }}>
                CIRA
              </h1>
            </div>
            <div className="text-2xl md:text-3xl font-mono neon-text mb-2">AI MEMECOIN ANALYZER</div>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl font-mono leading-relaxed">
              Advanced artificial intelligence system for analyzing memecoin potential, market sentiment, and investment
              opportunities in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="neon-glow font-mono text-lg px-8 py-4" asChild>
              <a href="/submit">INITIALIZE ANALYSIS</a>
            </Button>
          </div>

          {/* SOL Contract Address Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="neon-border bg-card/30 backdrop-blur-sm p-6 rounded-lg">
              <div className="font-mono text-sm neon-text mb-3 text-center">&gt; CIRA_TOKEN_CONTRACT</div>
              <div className="font-mono text-xs text-muted-foreground mb-2 text-center">SOLANA NETWORK</div>
              <div className="bg-black/50 p-3 rounded border border-cyan-400/30">
                <div className="font-mono text-sm text-cyan-300 break-all text-center">
                  Coming Soon
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-2 text-center">
              8WA2FYLVepDrcp7evHTqcPtqJQiU6bznxU8CX5aApump
              </div>
            </div>
          </div>
        </div>

        {/* Analyzed Tokens Section */}
        <div
          ref={tokensRef}
          className={`mb-16 transition-all duration-1000 ease-out delay-200 ${
            tokensVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="font-mono text-2xl neon-text mb-8 text-center">&gt; RECENTLY_ANALYZED_TOKENS</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyzedTokens.map((token, index) => (
              <Card
                key={index}
                className="neon-border bg-card/20 backdrop-blur-sm transition-all duration-500 ease-out hover:scale-105 hover:bg-card/40 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 group cursor-pointer"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                onClick={() => (window.location.href = `/analysis/${token.coinId}`)}
              >
                <div className="p-6 relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={token.logo || "/placeholder.svg"}
                        alt={`${token.name} logo`}
                        className="w-12 h-12 rounded-full border-2 border-cyan-400/30 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:scale-110"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background transition-all duration-300 group-hover:bg-green-300 group-hover:scale-125"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-lg neon-text font-bold transition-all duration-300 group-hover:text-cyan-300">
                        {token.name}
                      </div>
                      <div className="font-mono text-sm text-muted-foreground uppercase tracking-wider transition-all duration-300 group-hover:text-cyan-400/80">
                        {token.ticker}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-cyan-400/30 transition-all duration-300 group-hover:border-cyan-400/60">
                    <div>
                      <div className="font-mono text-xl font-bold text-white transition-all duration-300 group-hover:text-cyan-100">
                        {token.price}
                      </div>
                      <div
                        className={`font-mono text-sm font-semibold transition-all duration-300 ${token.change.startsWith("+") ? "text-green-400 group-hover:text-green-300" : "text-red-400 group-hover:text-red-300"}`}
                      >
                        {token.change} 24h
                      </div>
                    </div>

                    <div
                      className={`font-mono text-xs px-3 py-1 rounded-full border font-bold transition-all duration-300 ${
                        token.sentiment === "BULLISH"
                          ? "bg-green-900/30 text-green-400 border-green-400/50 group-hover:bg-green-800/40 group-hover:text-green-300 group-hover:border-green-300/70"
                          : token.sentiment === "BEARISH"
                            ? "bg-red-900/30 text-red-400 border-red-400/50 group-hover:bg-red-800/40 group-hover:text-red-300 group-hover:border-red-300/70"
                            : "bg-yellow-900/30 text-yellow-400 border-yellow-400/50 group-hover:bg-yellow-800/40 group-hover:text-yellow-300 group-hover:border-yellow-300/70"
                      }`}
                    >
                      {token.sentiment}
                    </div>
                  </div>

                  <div className="bg-card/50 neon-border rounded-lg p-2 transition-all duration-300 group-hover:bg-card/70 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                    <div className="font-mono text-xs text-muted-foreground mb-2 text-center transition-all duration-300 group-hover:text-cyan-400">
                      LIVE CHART
                    </div>
                    <TradingViewChart symbol={token.symbol} />
                  </div>

                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <div className="font-mono text-cyan-400 text-lg font-bold">&gt; VIEW_DETAILED_ANALYSIS</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ease-out delay-400 ${
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="neon-border bg-card/30 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-card/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="font-mono text-lg neon-text mb-4">&gt; SENTIMENT_ANALYSIS</div>
            <p className="font-mono text-sm leading-relaxed">
              Real-time social media sentiment tracking across Twitter, Reddit, and Discord communities using advanced
              NLP algorithms.
            </p>
          </Card>

          <Card className="neon-border bg-card/30 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-card/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="font-mono text-lg neon-text mb-4">&gt; MARKET_PREDICTION</div>
            <p className="font-mono text-sm leading-relaxed">
              AI-powered price prediction models analyzing historical data, trading patterns, and market volatility
              indicators.
            </p>
          </Card>

          <Card className="neon-border bg-card/30 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-card/50 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="font-mono text-lg neon-text mb-4">&gt; RISK_ASSESSMENT</div>
            <p className="font-mono text-sm leading-relaxed">
              Comprehensive risk analysis including liquidity checks, contract audits, and team verification protocols.
            </p>
          </Card>
        </div>

        {/* Terminal Output */}
        <Card
          ref={terminalRef}
          className={`neon-border bg-card/30 backdrop-blur-sm p-6 mb-16 transition-all duration-1000 ease-out delay-600 hover:bg-card/50 hover:shadow-xl hover:shadow-cyan-500/10 ${
            terminalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="font-mono text-sm space-y-2">
            <div className="neon-text">&gt; CIRA_SYSTEM_LOG</div>
            <div className="text-muted-foreground">&gt; Initializing neural networks...</div>
            <div className="text-muted-foreground">&gt; Loading market data streams...</div>
            <div className="text-accent">&gt; AI models ready for deployment</div>
            <div className="text-muted-foreground">&gt; Monitoring 1,247 active memecoins</div>
            <div className="neon-text terminal-cursor">&gt; System ready for analysis</div>
          </div>
        </Card>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`text-center transition-all duration-1000 ease-out delay-800 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="font-mono text-2xl neon-text mb-4">'Don't FOMO, Let AI Know'</div>
          <p className="font-mono text-muted-foreground mb-8">Join the future of memecoin analysis</p>
          <Button
            size="lg"
            className="neon-glow font-mono text-lg px-12 py-4 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/30"
            asChild
          >
            <a href="/submit">ACCESS TERMINAL</a>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="neon-border bg-card/50 backdrop-blur-sm mt-16 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="font-mono text-xs text-center text-muted-foreground">
            CIRA © 2024 | ARTIFICIAL INTELLIGENCE SYSTEMS |
            <span className="neon-text ml-2">SYSTEM_STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
