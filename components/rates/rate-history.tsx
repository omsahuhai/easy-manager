"use client";

import { useState } from "react";
import { EnrichedFuelRate } from "@/lib/queries/rates";
import { formatDateIST } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditRateDialog } from "@/components/rates/edit-rate-dialog";
import { History, Pencil, Calendar, IndianRupee } from "lucide-react";

interface RateHistoryProps {
  businessId: string;
  rates: EnrichedFuelRate[];
}

export function RateHistory({ businessId, rates }: RateHistoryProps) {
  const [selectedRate, setSelectedRate] = useState<EnrichedFuelRate | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (rate: EnrichedFuelRate) => {
    setSelectedRate(rate);
    setEditOpen(true);
  };

  if (rates.length === 0) {
    return (
      <Card className="shadow-sm border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Rate History</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Log of historical and scheduled fuel price changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sm text-muted-foreground">
            No fuel rates recorded yet. Add your first MS (Petrol) and HSD (Diesel) rates above to begin tracking.
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
                <CardTitle className="text-lg">Rate History</CardTitle>
                <CardDescription className="text-xs">
                  All effective fuel rates for this retail outlet.
                </CardDescription>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {rates.length} {rates.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card List (< 640px) */}
          <div className="divide-y sm:hidden">
            {rates.map((rate) => (
              <div key={rate.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        rate.fuel_type === "MS"
                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {rate.fuel_type} ({rate.fuel_type === "MS" ? "Petrol" : "Diesel"})
                    </span>
                    {rate.status === "active" && (
                      <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600 text-[10px] px-1.5 py-0">
                        Current
                      </Badge>
                    )}
                    {rate.status === "upcoming" && (
                      <Badge variant="secondary" className="bg-blue-500/15 text-blue-600 text-[10px] px-1.5 py-0">
                        Upcoming
                      </Badge>
                    )}
                    {rate.status === "historical" && (
                      <Badge variant="outline" className="text-muted-foreground text-[10px] px-1.5 py-0">
                        Historical
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(rate)}
                    className="h-8 px-2 text-xs"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      Selling Price
                    </div>
                    <div className="font-semibold text-base mt-0.5">
                      ₹{rate.rate.toFixed(2)}
                      <span className="text-[10px] text-muted-foreground font-normal"> / L</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">RO Dealer Margin</div>
                    <div className="font-medium text-sm mt-0.5 text-emerald-600 dark:text-emerald-400">
                      ₹{rate.margin.toFixed(4)}
                      <span className="text-[10px] text-muted-foreground font-normal"> / L</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1 border-t">
                  <Calendar className="h-3 w-3" />
                  <span>Effective from: {formatDateIST(rate.effective_date)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/60 text-muted-foreground border-b">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Fuel</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Effective Date</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Selling Price</th>
                  <th scope="col" className="px-4 py-3 font-semibold">RO Margin</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          rate.fuel_type === "MS"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {rate.fuel_type} ({rate.fuel_type === "MS" ? "Petrol" : "Diesel"})
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-foreground font-medium">
                      {formatDateIST(rate.effective_date)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-semibold">
                      ₹{rate.rate.toFixed(2)}
                      <span className="text-xs text-muted-foreground font-normal"> / L</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-medium text-emerald-600 dark:text-emerald-400">
                      ₹{rate.margin.toFixed(4)}
                      <span className="text-xs text-muted-foreground font-normal"> / L</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {rate.status === "active" && (
                        <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600 text-xs">
                          Current
                        </Badge>
                      )}
                      {rate.status === "upcoming" && (
                        <Badge variant="secondary" className="bg-blue-500/15 text-blue-600 text-xs">
                          Upcoming
                        </Badge>
                      )}
                      {rate.status === "historical" && (
                        <Badge variant="outline" className="text-muted-foreground text-xs">
                          Historical
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(rate)}
                        className="h-8 px-2.5 text-xs"
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

      <EditRateDialog
        businessId={businessId}
        rate={selectedRate}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
