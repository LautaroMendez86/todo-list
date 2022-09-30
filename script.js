const vm = new Vue({
  el: "#app",
  mounted() {
    if (window.localStorage.getItem("form"))
      this.tareas = JSON.parse(window.localStorage.getItem("form"));
    this.tareas = this.tareas.filter((tarea) => tarea.estado == false);
  },
  data: {
    nombre: "",
    descripcion: "",
    necesidad: "Sin apuro",
    tareas: [],
    estado: false,
    aside: false,
    eliminar: false,
    color: "Rojo",
    index: null,
    select: "Todos",
  },

  methods: {
    crearTarea() {
      if (this.index === null) {
        this.tareas.push({
          nombre: this.nombre,
          descripcion: this.descripcion,
          necesidad: this.necesidad,
          estado: false,
          color: this.color,
        });
      } else {
        this.tareas[this.index].nombre = this.nombre;
        this.tareas[this.index].descripcion = this.descripcion;
        this.tareas[this.index].color = this.color;
        this.tareas[this.index].necesidad = this.necesidad;
        this.index = null;
      }

      this.nombre = "";
      this.descripcion = "";
      this.necesidad = "Sin apuro";
      this.aside = false;
      this.color = "Rojo";
    },
    asides() {
      this.nombre = "";
      this.descripcion = "";
      this.necesidad = "Sin apuro";
      this.color = "Rojo";
      this.index = null;

      this.aside = !this.aside;
      this.eliminar = false;
    },
    eliminacion() {
      this.eliminar = !this.eliminar;
      this.aside = false;
    },
    reiniciar() {
      location.reload();
    },
    edit(nombre, necesidad, descripcion, color, i) {
      this.aside = true;
      this.nombre = nombre;
      this.necesidad = necesidad;
      this.descripcion = descripcion;
      this.color = color;
      this.index = i;
    },
  },
  computed: {
    filtrarColor() {
      if (this.select === "Todos") {
        return this.tareas;
      }

      return this.tareas.filter((tarea) => {
        return tarea.color.includes(this.select);
      });
    },
  },
});

vm.$watch(
  "tareas",
  (nuevo, antiguo) => {
    window.localStorage.setItem("form", JSON.stringify(nuevo));
  },
  { deep: true }
);
