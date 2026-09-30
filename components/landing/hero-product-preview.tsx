"use client";

import { useState } from "react";
import {
  IndianRupee,
  Droplet,
  TrendingUp,
  ReceiptText,
  Lock,
  Calendar,
  Fuel,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  PlusCircle,
  Smartphone,
  Monitor,
  Loader2,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function HeroProductPreview() {
  const [fuelType, setFuelType] = useState<"MS" | "HSD">("MS");
  
  // Real nozzle state for interactive demo - stored cleanly by fuel type
  const [closings, setClosings] = useState<{ MS: string; HSD: string }>({
    MS: "129620.80",
    HSD: "85658.30",
  });

  // Mobile navigation tabs & save state
  const [mobileTab, setMobileTab] = useState<"readings" | "overview">("readings");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Desktop view switcher (allows testing mobile view on desktop)
  const [desktopView, setDesktopView] = useState<"desktop" | "mobile">("desktop");

  // Locked baselines
  const msOpening = 128450.2;
  const hsdOpening = 84210.5;
  const testMeasure = 5.0; // Standard 5L testing measure

  // Rates & commissions
  const msRate = 104.2;
  const msMargin = 3.3;
  const hsdRate = 87.54;
  const hsdMargin = 3.15;

  // Active calculations
  const isMs = fuelType === "MS";
  const activeOpening = isMs ? msOpening : hsdOpening;
  const activeClosingStr = closings[fuelType];
  const parsedClosing = parseFloat(activeClosingStr);
  const activeClosing = isNaN(parsedClosing) ? activeOpening : parsedClosing;
  const activeRate = isMs ? msRate : hsdRate;
  const activeMargin = isMs ? msMargin : hsdMargin;

  const grossVolume = Math.max(0, activeClosing - activeOpening);
  const netVolume = Math.max(0, grossVolume - testMeasure);
  const activeSales = netVolume * activeRate;
  const activeProfit = netVolume * activeMargin;

  // Combined day stats
  const parsedMsClosing = parseFloat(closings.MS);
  const validMsClosing = isNaN(parsedMsClosing) ? msOpening : parsedMsClosing;
  const parsedHsdClosing = parseFloat(closings.HSD);
  const validHsdClosing = isNaN(parsedHsdClosing) ? hsdOpening : parsedHsdClosing;

  const totalMsGross = Math.max(0, validMsClosing - msOpening);
  const totalMsNet = Math.max(0, totalMsGross - testMeasure);
  const totalHsdGross = Math.max(0, validHsdClosing - hsdOpening);
  const totalHsdNet = Math.max(0, totalHsdGross - testMeasure);

  const totalDayVolume = totalMsNet + totalHsdNet;
  const totalDaySales = totalMsNet * msRate + totalHsdNet * hsdRate;
  const totalDayProfit = totalMsNet * msMargin + totalHsdNet * hsdMargin;

  const handleSaveReading = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3500);
    }, 600);
  };

  /* -------------------------------------------------------------
     MOBILE APP COMPONENT (Faithfully mirrors real mobile app UI)
     ------------------------------------------------------------- */
  const renderMobileApp = (idPrefix: string = "mobile") => {
    const closingInputId = `${idPrefix}-closing`;
    return (
    <div className="w-full text-left bg-card rounded-2xl border border-border/80 shadow-md shadow-black/5 dark:shadow-black/20 overflow-hidden">
      {/* Device Top Status Bar */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-muted/30 border-b border-border/50 text-[10px] text-muted-foreground font-medium">
        <span>09:41</span>
        <div className="h-2 w-12 bg-muted-foreground/20 rounded-full" />
        <span>Today</span>
      </div>

      {/* Mobile App Header */}
      <div className="flex items-center justify-between border-b border-border/70 bg-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Fuel className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-foreground leading-tight">
              Easy Manager
            </span>
            <span className="text-[10px] text-muted-foreground">
              IOCL Outlet #241098
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Open
          </span>
        </div>
      </div>

      {/* Business Header */}
      <div className="px-4 py-2.5 bg-card border-b border-border/40 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-foreground">
            Kisan Petroleum
          </h2>
          <p className="text-[11px] text-muted-foreground">
            24 Sep 2026
          </p>
        </div>
      </div>

      {/* Mobile Workspace Navigation Tabs */}
      <div className="border-b border-border/70 px-3.5 py-2 bg-card">
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-border/70 bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setMobileTab("readings")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
              mobileTab === "readings"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Gauge className="h-3.5 w-3.5" />
            <span>Daily Readings</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab("overview")}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
              mobileTab === "overview"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Overview</span>
          </button>
        </div>
      </div>

      {/* Mobile Screen Content */}
      <div className="p-3.5 sm:p-4 bg-muted/20 min-h-[360px]">
        {mobileTab === "readings" ? (
          /* TAB 1: Mobile Reading Form */
          <div className="space-y-3">
            {/* Success Feedback Toast */}
            {showSavedToast && (
              <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Reading saved successfully.</span>
              </div>
            )}

            {/* Reading Form Card */}
            <div className="rounded-xl border border-border bg-card p-3.5 sm:p-4 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <PlusCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground">
                      Nozzle 1 Reading
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Enter today&apos;s closing reading
                    </p>
                  </div>
                </div>
              </div>

              {/* Fuel Type Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-foreground block">
                  Fuel Product
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFuelType("MS")}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-semibold transition-all ${
                      fuelType === "MS"
                        ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500 shadow-xs"
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Petrol (MS)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFuelType("HSD")}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-semibold transition-all ${
                      fuelType === "HSD"
                        ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500 shadow-xs"
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Diesel (HSD)</span>
                  </button>
                </div>
              </div>

              {/* Opening & Closing Readings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Opening Reading (Auto-locked) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground">
                      Opening Reading (L)
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Lock className="h-2.5 w-2.5 text-primary" /> Yesterday
                    </span>
                  </div>
                  <div className="h-10 px-3 flex items-center rounded-lg border border-border/80 bg-muted/50 font-mono text-xs font-semibold text-muted-foreground">
                    {activeOpening.toFixed(2)}
                  </div>
                  <p className="text-[9px] text-muted-foreground">
                    Carried over automatically
                  </p>
                </div>

                {/* Closing Reading (Interactive Touch Input) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor={closingInputId} className="text-[11px] font-semibold text-foreground">
                      Closing Reading (L)
                    </label>
                    <span className="text-[10px] text-primary font-medium">
                      Tap to edit
                    </span>
                  </div>
                  <Input
                    id={closingInputId}
                    name={closingInputId}
                    aria-label="Closing Reading (L)"
                    type="number"
                    step="0.1"
                    value={activeClosingStr}
                    onChange={(e) => {
                      const str = e.target.value;
                      setClosings((prev) => ({ ...prev, [fuelType]: str }));
                    }}
                    className="h-10 font-mono text-xs font-bold text-foreground bg-background border-primary/40 focus-visible:ring-primary shadow-xs"
                  />
                  <p className="text-[9px] text-muted-foreground">
                    From nozzle meter display
                  </p>
                </div>
              </div>

              {/* Immediate Calculation Result (No nested cards, clean grouping) */}
              <div className="rounded-lg bg-muted/40 p-3 space-y-2 border border-border/60">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-muted-foreground">Litres Sold</span>
                    <span className="text-[10px] text-muted-foreground block">5 L morning testing deducted</span>
                  </div>
                  <span className="font-mono text-base font-bold text-foreground">
                    {netVolume.toFixed(2)} L
                  </span>
                </div>

                <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Today&apos;s Sale</span>
                    <span className="font-mono font-bold text-foreground text-xs sm:text-sm">
                      ₹{activeSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Your Margin</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                      ₹{activeProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleSaveReading}
                disabled={isSaving}
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xs active:scale-[0.99]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Save Reading</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* TAB 2: Station Overview */
          <div className="space-y-3">
            {/* Performance Stat Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-border bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-[11px] font-medium">Today&apos;s Sales</span>
                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="mt-1 text-base font-bold font-mono text-foreground tracking-tight">
                  ₹{totalDaySales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  Auto-calculated
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-[11px] font-medium">Litres Sold</span>
                  <Droplet className="h-3.5 w-3.5 text-blue-500" />
                </div>
                <div className="mt-1 text-base font-bold font-mono text-foreground tracking-tight">
                  {totalDayVolume.toFixed(2)} L
                </div>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  After 5L testing
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-[11px] font-medium">Your Margin</span>
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <div className="mt-1 text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                  ₹{totalDayProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  Your commission
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-[11px] font-medium">Expenses</span>
                  <ReceiptText className="h-3.5 w-3.5 text-rose-500" />
                </div>
                <div className="mt-1 text-base font-bold font-mono text-foreground tracking-tight">
                  ₹54,200.00
                </div>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  Monthly logged
                </p>
              </div>
            </div>

            {/* Today's Fuel Breakdown */}
            <div className="rounded-xl border border-border bg-card p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-foreground pb-1 border-b border-border/60">
                <span>Fuel Breakdown</span>
                <Droplet className="h-3.5 w-3.5 text-primary" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-foreground">Petrol (MS)</span>
                </div>
                <span className="font-mono text-muted-foreground">
                  {totalMsNet.toFixed(2)} L · ₹{(totalMsNet * msRate).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-foreground">Diesel (HSD)</span>
                </div>
                <span className="font-mono text-muted-foreground">
                  {totalHsdNet.toFixed(2)} L · ₹{(totalHsdNet * hsdRate).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Footer Status Strip */}
      <div className="border-t border-border/70 bg-card px-4 py-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Today&apos;s Total</span>
        <span className="font-mono font-bold text-foreground">
          ₹{totalDaySales.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
    );
  };

  /* -------------------------------------------------------------
     DESKTOP APP WINDOW (Spacious, elegant forecourt accounting)
     ------------------------------------------------------------- */
  const renderDesktopApp = () => (
    <div className="rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/5 dark:shadow-black/25 overflow-hidden text-left transition-all">
      {/* Workspace Topbar */}
      <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Fuel className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                Kisan Petroleum
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                IOCL Outlet #241098
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher & Date Badge */}
        <div className="flex items-center gap-3">
          {/* Device Preview Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-background p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setDesktopView("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                desktopView === "desktop"
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop View</span>
            </button>
            <button
              type="button"
              onClick={() => setDesktopView("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                desktopView === "mobile"
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {desktopView === "mobile" ? (
        /* Render Mobile phone mockup view on desktop when selected */
        <div className="p-8 sm:p-12 bg-muted/30 flex flex-col items-center justify-center">
          <div className="w-full max-w-[380px] rounded-[2.5rem] p-3 bg-neutral-900 border-4 border-neutral-700/60 shadow-2xl">
            {/* Phone Speaker & Dynamic Island */}
            <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />
            {renderMobileApp("desktop-phone")}
            {/* Home Indicator */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-3" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Responsive mobile screen preview.
          </p>
        </div>
      ) : (
        /* Regular Desktop Workspace View */
        <>
          {/* Dashboard 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-background/50 border-b border-border/60">
            <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">Today&apos;s Sales</span>
                <IndianRupee className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground font-mono">
                ₹{totalDaySales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Auto-calculated</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">Litres Sold</span>
                <Droplet className="h-4 w-4 text-blue-500" />
              </div>
              <div className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground font-mono">
                {totalDayVolume.toFixed(2)} L
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Net after 5L testing</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">Your Margin</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
                ₹{totalDayProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Your commission</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">Monthly Expenses</span>
                <ReceiptText className="h-4 w-4 text-rose-500" />
              </div>
              <div className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground font-mono">
                ₹54,200.00
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Staff, power & genset</p>
            </div>
          </div>

          {/* Interactive Nozzle Register Demo */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Daily Nozzle Register
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Change the closing reading to test live calculation.
                </p>
              </div>

              {/* Fuel Tab Switcher */}
              <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1 self-start sm:self-auto shadow-2xs">
                <button
                  type="button"
                  id="hero-fuel-ms"
                  onClick={() => setFuelType("MS")}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    fuelType === "MS"
                      ? "bg-background text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Petrol (MS)
                </button>
                <button
                  type="button"
                  id="hero-fuel-hsd"
                  onClick={() => setFuelType("HSD")}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    fuelType === "HSD"
                      ? "bg-background text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Diesel (HSD)
                </button>
              </div>
            </div>

            {/* Active Nozzle Input Strip */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-5 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${fuelType === "MS" ? "bg-amber-500" : "bg-blue-500"}`} />
                  <span className="font-bold text-foreground text-sm">
                    {fuelType === "MS" ? "Nozzle 1 · Petrol (MS)" : "Nozzle 2 · Diesel (HSD)"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Rate: <strong className="text-foreground font-mono font-semibold">₹{activeRate.toFixed(2)}/L</strong> · Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">₹{activeMargin.toFixed(2)}/L</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Opening Reading (Auto-Locked) */}
                <div>
                  <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1 mb-1.5">
                    Opening <Lock className="h-3 w-3 text-primary" />
                  </span>
                  <div id="hero-opening" className="h-9 px-3 flex items-center rounded-lg border border-border bg-muted/50 font-mono text-xs font-medium text-foreground">
                    {activeOpening.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">From yesterday</span>
                </div>

                {/* Closing Reading (Editable Input) */}
                <div>
                  <label htmlFor="hero-closing" className="text-[11px] font-medium text-muted-foreground block mb-1.5">
                    Closing Reading
                  </label>
                  <Input
                    id="hero-closing"
                    name="heroClosingReading"
                    aria-label="Closing Reading (L)"
                    type="number"
                    step="0.1"
                    value={activeClosingStr}
                    onChange={(e) => {
                      const str = e.target.value;
                      setClosings((prev) => ({ ...prev, [fuelType]: str }));
                    }}
                    className="h-9 font-mono text-xs font-bold text-foreground bg-background border-primary/40 focus-visible:ring-primary shadow-2xs"
                  />
                  <span className="text-[10px] text-primary mt-1 block font-medium">Tap to edit</span>
                </div>

                {/* 5L Testing jar */}
                <div>
                  <span className="text-[11px] font-medium text-muted-foreground block mb-1.5">
                    Testing Jar
                  </span>
                  <div id="hero-testing" className="h-9 px-3 flex items-center rounded-lg border border-border bg-muted/50 font-mono text-xs text-muted-foreground">
                    -5.00 L
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Morning test</span>
                </div>

                {/* Net Dispensed Litres */}
                <div>
                  <span className="text-[11px] font-medium text-muted-foreground block mb-1.5">
                    Litres Sold
                  </span>
                  <div id="hero-net" className="h-9 px-3 flex items-center rounded-lg border border-primary/30 bg-primary/5 font-mono text-xs font-bold text-foreground">
                    {netVolume.toFixed(2)} L
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">Calculated</span>
                </div>
              </div>

              {/* Financial Outcome Ribbon */}
              <div className="pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <span>Nozzle sales calculated automatically</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>
                    Sale: <strong className="text-foreground font-bold">₹{activeSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </span>
                  <span>
                    Margin: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹{activeProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* 
        On mobile viewports (< 768px):
        Clean smartphone interface framed cleanly for real phone widths.
      */}
      <div className="block md:hidden mx-auto max-w-sm sm:max-w-md">
        <div className="rounded-[1.75rem] p-1.5 sm:p-2 bg-card/70 border border-border/80 shadow-xl shadow-black/5 dark:shadow-black/25">
          {renderMobileApp("mobile")}
        </div>
      </div>

      {/* 
        On desktop viewports (>= 768px):
        Show desktop app window with toggle to preview mobile device view as well.
      */}
      <div className="hidden md:block">
        {renderDesktopApp()}
      </div>
    </div>
  );
}
