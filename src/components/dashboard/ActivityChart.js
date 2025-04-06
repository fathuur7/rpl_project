
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart } from "@tremor/react";

const ActivityChart = ({ data, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>User growth and activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-72"
          data={data}
          index="date"
          categories={["Active Users", "New Signups"]}
          colors={["blue", "cyan"]}
          valueFormatter={(number) => `${new Intl.NumberFormat("us").format(number).toString()}`}
        />
      </CardContent>
    </Card>
  );
};

export default ActivityChart;

