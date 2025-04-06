
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DonutChart } from "@tremor/react";

const RoleChart = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles</CardTitle>
        <CardDescription>Distribution of user permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <DonutChart
          className="h-72"
          data={data}
          category="value"
          index="name"
          colors={["indigo", "blue", "cyan"]}
        />
      </CardContent>
    </Card>
  );
};

export default RoleChart;


