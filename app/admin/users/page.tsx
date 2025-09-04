import PageContainer from "@/components/layout/page-container";
import React from "react";
import Dashboard from "./_components/table-users";

function Users() {
  return (
    <PageContainer scrollable>
      <Dashboard />
    </PageContainer>
  );
}

export default Users;
