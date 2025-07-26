import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import App from "../App.vue";
import router from "../router";
import "../css/main.css";
import { useAuthStore } from "@/stores/auth";

const screen = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: "",
});

function updateBreakpoint() {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    if (screen.width < 640) screen.breakpoint = "mobile";
    else if (screen.width < 1024) screen.breakpoint = "tablet";
    else screen.breakpoint = "desktop";
}

function updateBody() {
    const content = 640;
    const margin = screen.width - content;
    const demiMargin = margin / 2;

    if (screen.breakpoint === "desktop") {
        document.body.style.width = `${content}px`;
        document.body.style.height = `${screen.height}px`;
        document.body.style.margin = `0 ${demiMargin}px`;
    } else if (screen.breakpoint === "tablet") {
        document.body.style.width = `${content}px`;
        document.body.style.height = `${screen.height}px`;
        document.body.style.margin = `0 ${demiMargin}px`;
    } else {
        document.body.style.width = `${screen.width}px`;
        document.body.style.height = `${screen.height}px`;
        document.body.style.margin = "0";
    }
}

updateBreakpoint();
updateBody();

window.addEventListener("resize", () => {
    updateBreakpoint();
    updateBody();
});

const app = createApp(App);

app.provide("screen", screen);
app.use(createPinia());

const authStore = useAuthStore();
authStore.fetchUser();
app.use(router).mount("#app");
