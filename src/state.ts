import { User, Hashtag, GroupId } from "./api/user";
import { reactive, inject, readonly, provide, toRefs, ToRefs } from "vue";

type GlobalState = {
  state: {
    loggedIn: boolean;
  } & User;
};

//global state of the app. it holds login status and the user info
const globalState = reactive<GlobalState>({
  state: {
    loggedIn: false,
    userName: "",
    subscribedGroups: [],
    interests: [],
  },
});

// methods that can mutate the global state
const mutations = {
  setLoggedIn(loggedIn: boolean) {
    globalState.state.loggedIn = loggedIn;
  },
  setUserName(userName: string) {
    globalState.state.userName = userName;
  },
  setEmail(email: string) {
    globalState.state.email = email;
  },
  setBio(bio: string) {
    globalState.state.bio = bio;
  },
  setSubscribedGroups(gs: GroupId[]) {
    globalState.state.subscribedGroups = gs;
  },
  setInterests(is: Hashtag[]) {
    globalState.state.interests = is;
  },
  unsetUserState() {
    localStorage.clear();
    globalState.state.loggedIn = false;
    globalState.state.userName = "";
    globalState.state.email = "";
    globalState.state.bio = "";
    globalState.state.subscribedGroups = [];
    globalState.state.interests = [];
  }
};

// define a unique key to access the value
const STATE_SYMBOL = Symbol("read global state");
const MUTATION_SYMBOL = Symbol("global state mutation");

export type State = GlobalState["state"];
export type MutationMethods = typeof mutations;

//provide the global state as readonly
export const provideState = (state: State): void => {
  globalState.state = state;
  provide(STATE_SYMBOL, readonly(globalState));
  provide(MUTATION_SYMBOL, mutations);
};

//gives access to readonly states and mutation methods;
//e.g const {userName,setUserName} = useState();
export const useState = (): MutationMethods & ToRefs<State> => {
  const globalState = inject<GlobalState>(STATE_SYMBOL);
  const mutationMethods = inject<MutationMethods>(MUTATION_SYMBOL);
  if (globalState && globalState["state"] && mutationMethods) {
    const state = globalState["state"];
    return {
      ...toRefs(state),
      ...mutationMethods,
    };
  } else {
    throw new Error("useState() is called without a provider.");
  }
};
