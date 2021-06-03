<template>
  <nav
    class="navbar navbar-expand-sm"
    style="background-color: rgb(144, 180, 251)"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/"
        ><h1 class="text-light ml-0 pl-0">niched</h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <input
          class="form-control ml-sm-5 mr-sm-5"
          type="text"
          placeholder="Search"
          @input="onChange"
        />
        <div class="mr-sm-5">
          <button class="btn btn-outline-success" @click="jumpToCreateSpace">
            create space
          </button>
        </div>
        <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  emits: ["input"],
  setup(_, { emit }) {
    const onChange = (e: Event) => {
      emit("input", (e.target as HTMLInputElement).value);
    };
    const router = useRouter();

    return {
      onChange,
      jumpToCreateSpace() {
        router.push({ name: "CreateSpace" });
      },
    };
  },
});
</script>
