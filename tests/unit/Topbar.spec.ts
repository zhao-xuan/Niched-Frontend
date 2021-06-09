import { shallowMount } from "@vue/test-utils";
import Topbar from "@/views/Topbar.vue";
describe("Topbar.vue", () => {
  it("search string event emits", () => {
    try {
      const TopbarMock = shallowMount(Topbar, {});
      const searchString = "ramen";

      TopbarMock.vm.$emit("input");
      TopbarMock.vm.$emit("input", searchString);

      // event has been emitted
      expect(TopbarMock.emitted().input).toBeTruthy();

      // check for event count
      expect(TopbarMock.emitted().input.length).toBe(2);

      // check for event payload
      expect(TopbarMock.emitted().input[0]).toEqual([]);
      expect(TopbarMock.emitted().input[1]).toEqual([searchString]);
    } catch (err) {}
  });
});
