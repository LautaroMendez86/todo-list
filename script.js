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
  },

  methods: {
    crearTarea() {
      if ((this.index === null)) {
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
        this.index = null
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
      this.index = null

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
    edit(a, b, c, d, i) {
      this.aside = true;
      this.nombre = a;
      this.necesidad = b;
      this.descripcion = c;
      this.color = d;
      this.index = i;
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
