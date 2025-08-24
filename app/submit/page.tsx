"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import MatrixRain from "@/components/matrix-rain"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    description: "",
    picture: null as File | null,
    twitterLink: "",
    telegramLink: "",
    websiteLink: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [fileError, setFileError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateFile = (file: File): string => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return "Only JPEG and PNG files are allowed"
    }

    const maxSize = 50 * 1024 * 1024 // 50MB in bytes
    if (file.size > maxSize) {
      return "File size must not exceed 50MB"
    }

    return ""
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const error = validateFile(file)
      if (error) {
        setFileError(error)
        setFormData((prev) => ({ ...prev, picture: null }))
        e.target.value = ""
        return
      } else {
        setFileError("")
      }
    } else {
      setFileError("")
    }

    setFormData((prev) => ({ ...prev, picture: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitProgress(0)

    let dataToStore = { ...formData }
    if (formData.picture) {
      try {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.picture!)
        })
        dataToStore = { ...formData, picture: base64 }
      } catch (error) {
        console.error("Error converting file to base64:", error)
        dataToStore = { ...formData, picture: null }
      }
    }

    localStorage.setItem("submissionData", JSON.stringify(dataToStore))

    const progressInterval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsSubmitting(false)
          window.location.href = "/results"
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background retro-grid relative">
      <MatrixRain />

      {/* Header */}
      <div className="neon-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="font-mono text-sm space-y-1">
            <div className="flex justify-between items-center">
              <span className="neon-text">&gt; MEMECOIN_SUBMISSION_TERMINAL</span>
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
            <div className="neon-text">&gt; Status: READY_FOR_INPUT</div>
            <div className="text-muted-foreground">&gt; AI Analysis Engine: STANDBY</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold font-mono" style={{ color: "#5eeeee" }}>
                SUBMIT_TOKEN
              </h1>
            </div>
            <p className="font-mono text-lg text-muted-foreground">&gt; Initialize memecoin analysis protocol</p>
          </div>

          {/* Submission Form */}
          <Card className="neon-border bg-card/30 backdrop-blur-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Token Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono text-sm neon-text">
                  &gt; TOKEN_NAME
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter token name..."
                  className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input"
                  required
                />
              </div>

              {/* Token Ticker */}
              <div className="space-y-2">
                <Label htmlFor="ticker" className="font-mono text-sm neon-text">
                  &gt; TOKEN_TICKER
                </Label>
                <Input
                  id="ticker"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleInputChange}
                  placeholder="Enter ticker symbol..."
                  className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input uppercase"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-mono text-sm neon-text">
                  &gt; TOKEN_DESCRIPTION
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your memecoin project..."
                  className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input min-h-[120px]"
                  required
                />
              </div>

              {/* Picture Upload */}
              <div className="space-y-2">
                <Label htmlFor="picture" className="font-mono text-sm neon-text">
                  &gt; TOKEN_LOGO
                </Label>
                <Input
                  id="picture"
                  name="picture"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileChange}
                  className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input file:bg-cyan-500/20 file:border-0 file:text-cyan-400 file:font-mono file:text-sm"
                  required
                />
                <div className="text-xs font-mono text-muted-foreground">
                  &gt; Accepted formats: JPEG, PNG | Max size: 50MB
                </div>
                {fileError && <div className="text-xs font-mono text-red-400 neon-text">&gt; ERROR: {fileError}</div>}
              </div>

              {/* Social Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitterLink" className="font-mono text-sm neon-text">
                    &gt; TWITTER_LINK
                  </Label>
                  <Input
                    id="twitterLink"
                    name="twitterLink"
                    value={formData.twitterLink}
                    onChange={handleInputChange}
                    placeholder="https://x.com/..."
                    className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telegramLink" className="font-mono text-sm neon-text">
                    &gt; TELEGRAM_LINK
                  </Label>
                  <Input
                    id="telegramLink"
                    name="telegramLink"
                    value={formData.telegramLink}
                    onChange={handleInputChange}
                    placeholder="https://t.me/..."
                    className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteLink" className="font-mono text-sm neon-text">
                  &gt; WEBSITE_LINK
                </Label>
                <Input
                  id="websiteLink"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="font-mono bg-card/50 border-cyan-400/30 focus:border-cyan-400 neon-glow-input"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                {isSubmitting ? (
                  <div className="space-y-4">
                    <div className="font-mono text-sm neon-text text-center">
                      &gt; PROCESSING_SUBMISSION... {submitProgress}%
                    </div>
                    <div className="w-full bg-card/50 rounded-full h-2 neon-border">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${submitProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full neon-glow font-mono text-lg py-4 transition-all duration-300 hover:scale-105"
                    disabled={!!fileError}
                  >
                    SUBMIT_FOR_ANALYSIS
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Terminal Output */}
          <Card className="neon-border bg-card/30 backdrop-blur-sm p-6 mt-8">
            <div className="font-mono text-sm space-y-2">
              <div className="neon-text">&gt; SUBMISSION_PROTOCOL_ACTIVE</div>
              <div className="text-muted-foreground">&gt; Awaiting token data input...</div>
              <div className="text-muted-foreground">&gt; AI analysis will commence upon submission</div>
              <div className="text-accent">&gt; Expected analysis time: 2-5 minutes</div>
              <div className="neon-text terminal-cursor">&gt; Ready for data upload</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
