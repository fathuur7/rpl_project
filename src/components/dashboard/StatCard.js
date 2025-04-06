
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ title, value, change, isPositive, description }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">{value}</div>
          <Badge 
            variant="outline" 
            className={`${isPositive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}
          >
            {change}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
