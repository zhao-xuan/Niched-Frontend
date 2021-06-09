<template>
  <div class="sidenav">
    <div class="login-main-text">
      <h1>
        Welcome to<br />
        Niched!
      </h1>
      <p>Login or register from here to access.</p>
    </div>
  </div>
  <div class="main">
    <div class="col-md-6 col-sm-12">
      <div class="login-form">
        <form @submit.prevent>
          <div class="form-group">
            <label>User Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="User Name"
              v-model="userNameInput"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button class="btn btn-primary m-2" @click="onLogIn">Login</button>
          <button class="btn btn-white m-2">Register</button>
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
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useState } from "@/state";
import { fetchUser } from "@/api/user";
import { AxiosError } from "axios";
export default defineComponent({
  name: "Login",
  setup() {
    const userNameInput = ref("");
    const {
      setUserName,
      setLoggedIn,
      setEmail,
      setBio,
      setInterests,
      setSubscribedGroups,
    } = useState();
    const router = useRouter();
    const onLogIn = async () => {
      try {
        const { user_name, email, bio, interests, subscribed_groups } =
          await fetchUser(userNameInput.value);
        setUserName(user_name);
        setInterests(interests);
        setSubscribedGroups(subscribed_groups);
        setBio(bio || "");
        setEmail(email || "");
        setLoggedIn(true);
        alert("login success!");
        router.push({ name: "Home" });
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.status);
        alert(error.response?.statusText);
      }
    };

    return { userNameInput, onLogIn };
  },
});
</script>
