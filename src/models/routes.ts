import React from "react";

export type TRoutes = {
    path: string;
    Component: React.ComponentType;
    name?: string;
    showInMenu?: boolean;
    exact?: boolean;
}