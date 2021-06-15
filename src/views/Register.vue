<template>
  <div class="sidenav">
    <div class="login-main-text">
      <h1>
        Register to be<br />
        Niched!
      </h1>
      <p>Please fill in some text boxes shown at the right hand side.</p>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-8 col-lg-6">
          <div class="login-form">
            <form @submit.prevent>
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="userName"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  v-model="emailValue"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="pwd"
                />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Re-enter Password"
                />
              </div>
              <div class="card my-2">
                <div class="card-body">
                  <h5 class="card-title">Select Your Interest</h5>
                  <p class="card-text">
                    <el-check-tag
                      class="el-check-tag"
                      :key="tag"
                      v-for="(tag, index) in dynamicTags"
                      :disable-transitions="false"
                      @change="onChangeSelectInterest(index)"
                      :checked="isTagSelected[index]"
                    >
                      {{ tag }}
                    </el-check-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="mini"
                      @keyup.enter="handleInputConfirm"
                      @blur="handleInputConfirm"
                      placeholder="Enter a new interest of yours and then hit Enter"
                    >
                    </el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                      >+ New Tag</el-button
                    >
                  </p>
                </div>
              </div>
            </form>
            <button class="btn btn-primary m-2" @click="onRegister">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Lato", sans-serif;
}

.el-check-tag {
  margin: 10px;
}

.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: rgb(140, 175, 244);
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 30%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { registerUser, loginUser } from "@/api/auth";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { postUserDetails } from "@/api/user";
import { usePost } from "@/hooks/usePost";

export default defineComponent({
  name: "Register",
  setup() {
    const userName = ref("");
    const emailValue = ref("");
    const pwd = ref("");

    const dynamicTags = ref([
      "Sports",
      "Music",
      "Game",
      "Book",
      "Manga",
      "Movie",
      "Food",
      "Travel",
      "Animal",
    ]);
    const isTagSelected = ref([true, false, true]);
    const inputVisible = ref(false);
    const inputValue = ref("");

    const router = useRouter();

    const { doPost: doPostUserDetails } = usePost(postUserDetails);

    const onRegister = async () => {
      try {
        const { user_name, email, bio, interests, subscribed_groups } =
          await registerUser(userName.value, emailValue.value, pwd.value);
        alert("register successful! About to login you in!");

        doPostUserDetails({
          userName: user_name,
          email,
          interests: dynamicTags.value.filter((_, i) => isTagSelected.value[i]),
        });

        const { access_token, token_type } = await loginUser(
          userName.value,
          pwd.value
        );
        router.push("Home");
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.status);
        alert(JSON.stringify(error.response?.data));
      }
    };

    const handleClose = (tag: string) => {
      dynamicTags.value = dynamicTags.value.splice(
        dynamicTags.value.indexOf(tag),
        1
      );
    };

    const showInput = () => {
      inputVisible.value = !inputVisible.value;
    };

    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };

    const onChangeSelectInterest = (i: number) => {
      isTagSelected.value[i] = !isTagSelected.value[i];
    };

    return {
      userName,
      emailValue,
      pwd,
      dynamicTags,
      isTagSelected,
      inputVisible,
      inputValue,
      onRegister,
      showInput,
      handleClose,
      handleInputConfirm,
      onChangeSelectInterest,
    };
  },
});
</script>
