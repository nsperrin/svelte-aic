import babel from "rollup-plugin-babel";

export default {
  plugins: [
    babel({
      extensions: [".js", ".svelte"],
      plugins: ["rewire-exports"]
    })
  ]
};