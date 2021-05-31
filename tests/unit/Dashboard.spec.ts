import { shallowMount } from "@vue/test-utils";
import Dashboard from "@/views/dashboard/Dashboard.vue";
describe("Dashboard.vue", () => {
  it("renders props.foo when passed", () => {
    const DashboardMock = shallowMount(Dashboard, {});
    expect(DashboardMock.text()).toContain("dashboard");
  });
});
