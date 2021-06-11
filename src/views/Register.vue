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
    <div class="col-md-4 col-sm-8">
      <div class="login-form">
        <form @submit.prevent>
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" placeholder="Username" v-model="userName" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" placeholder="Email" v-model="emailValue" />
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
          <button type="submit" class="btn btn-primary m-2" @click="onRegister">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Lato", sans-serif;
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
    margin-top: 80%;
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

export default defineComponent({
  name: "Register",
  setup() {
    const userName = ref("");
    const emailValue = ref("");
    const pwd = ref("");

    const router = useRouter();

    const onRegister = async () => {
      try {
        const { user_name, email, bio, interests, subscribed_groups } =
          await registerUser(userName.value, emailValue.value, pwd.value);
        alert("register successful! About to login you in!");
        const { access_token, token_type } = await loginUser(userName.value, pwd.value);
        router.push("Home");
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.status);
        alert(JSON.stringify(error.response?.data));
      }
    }

    return {
      userName, emailValue, pwd, onRegister
    };
  },
});
</script>
