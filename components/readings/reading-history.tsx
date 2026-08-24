"use client";

import { useState } from "react";
import { ReadingWithContinuity } from "@/lib/types";
import { formatDateIST } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditReadingDialog } from "@/components/readings/edit-reading-dialog";
import { History, Pencil, AlertTriangle, AlertCircle, Droplet, Gauge } from "lucide-react";

interface ReadingHistoryProps {
  businessId: string;
  readings: ReadingWithContinuity[];
}

export function ReadingHistory({ businessId, readings }: ReadingHistoryProps) {
  const [selectedReading, setSelectedReading] = useState<ReadingWithContinuity | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (reading: ReadingWithContinuity) => {
    setSelectedReading(reading);
    setEditOpen(true);
  };

  if (readings.length === 0) {
    return (
      <Card className="shadow-sm border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Daily Reading Register</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Complete closing ledger of meter readings, volumes, and calculated dealer profit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sm text-muted-foreground">
            No meter readings recorded yet. Add your first MS (Petrol) or HSD (Diesel) reading above to start your register.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Daily Reading Register</CardTitle>
                <CardDescription className="text-xs">
                  All recorded meter readings, litres sold, and authoritative view calculations.
                </CardDescription>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {readings.length} {readings.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card List (< 640px) */}
          <div className="divide-y sm:hidden">
            {readings.map((reading) => (
              <div key={reading.reading_id} className="p-4 space-y-3">
                {/* Header: Date + Fuel + Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">
                      {formatDateIST(reading.reading_date)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        reading.fuel_type === "MS"
                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {reading.fuel_type}
                    </span>
                    {reading.is_first_reading && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        First Reading
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(reading)}
                    className="h-8 px-2 text-xs"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>

                {/* Continuity Warning Banner if Mismatch */}
                {reading.has_opening_mismatch && (
                  <div className="p-2 rounded bg-amber-500/15 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-1.5 border border-amber-500/30">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Opening Mismatch:</strong> Opening ({reading.opening_reading} L) ≠ Previous Closing ({reading.previous_recorded_closing} L).
                    </span>
                  </div>
                )}

                {/* Missing Rate Banner */}
                {reading.rate_missing && (
                  <div className="p-2 rounded bg-amber-500/15 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-1.5 border border-amber-500/30">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Rate Missing for this date. Sales & RO Profit are pending rate setup.</span>
                  </div>
                )}

                {/* Meters Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 p-2.5 rounded-md">
                  <div>
                    <span className="text-muted-foreground">Opening Meter:</span>
                    <div className="font-mono font-medium text-sm mt-0.5">{reading.opening_reading.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Closing Meter:</span>
                    <div className="font-mono font-medium text-sm mt-0.5">{reading.closing_reading.toFixed(2)}</div>
                  </div>
                </div>

                {/* Financial / Volume Summary */}
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <div className="text-muted-foreground flex items-center gap-0.5">
                      <Droplet className="h-3 w-3" /> Volume
                    </div>
                    <div className="font-semibold text-sm mt-0.5">{reading.litres.toFixed(2)} L</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Fuel Sales</div>
                    <div className="font-semibold text-sm mt-0.5">
                      {reading.sales !== null ? `₹${reading.sales.toFixed(2)}` : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">RO Profit</div>
                    <div className="font-semibold text-sm mt-0.5 text-emerald-600 dark:text-emerald-400">
                      {reading.profit !== null ? `₹${reading.profit.toFixed(2)}` : "—"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/60 text-muted-foreground border-b">
                <tr>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Fuel</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Opening</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Closing</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Volume</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Rate</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">Sales</th>
                  <th scope="col" className="px-3.5 py-3 font-semibold">RO Profit</th>
                  <th scope="col" className="px-3 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {readings.map((reading) => (
                  <tr
                    key={reading.reading_id}
                    className={`hover:bg-muted/30 transition-colors ${
                      reading.has_opening_mismatch ? "bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="px-3.5 py-3 whitespace-nowrap font-medium">
                      {formatDateIST(reading.reading_date)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          reading.fuel_type === "MS"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {reading.fuel_type}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <span>{reading.opening_reading.toFixed(2)}</span>
                        {reading.has_opening_mismatch && (
                          <span
                            title={`Mismatch: Previous recorded closing was ${reading.previous_recorded_closing}`}
                            className="inline-flex items-center text-amber-600 dark:text-amber-400 cursor-help"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" />
                          </span>
                        )}
                        {reading.is_first_reading && (
                          <span title="First starting meter" className="text-muted-foreground">
                            <Gauge className="h-3.5 w-3.5 opacity-50" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap font-mono text-xs">
                      {reading.closing_reading.toFixed(2)}
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap font-semibold">
                      {reading.litres.toFixed(2)} L
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap text-xs">
                      {reading.rate_missing ? (
                        <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/40 text-[10px] px-1 py-0">
                          Rate Missing
                        </Badge>
                      ) : (
                        `₹${reading.rate?.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap font-medium text-xs">
                      {reading.sales !== null ? `₹${reading.sales.toFixed(2)}` : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap font-medium text-xs text-emerald-600 dark:text-emerald-400">
                      {reading.profit !== null ? `₹${reading.profit.toFixed(2)}` : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(reading)}
                        className="h-8 px-2 text-xs"
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EditReadingDialog
        businessId={businessId}
        reading={selectedReading}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
