let apiUrl = "https://fix.trickstar04.my.id/index.php/";
Vue.createApp({
  data() {
    return {
      massage:"Hi",
      header: {
      },
      articles:[],
      article:null,
    };
  },
  methods: {
    getHeaderData() {
      axios
        .get(apiUrl+"users/1")
        .then((res) => {
          this.header = res.data;
          this.getArticles();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticles() {
      axios
        .get(apiUrl+"Articles")
        .then((res) => {
          this.articles = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMarkdown() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const articles = urlParams.get('article');
      var converter = new showdown.Converter();
      console.log(articles);
      axios
        .get(
          src = "https://raw.githubusercontent.com/Trickstar04/Tekweb2022/main/contents/" + articles
        )
        .then((res) => {
          var html = converter.makeHtml(res.data);
          this.article = html;
          console.log(html);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  beforeMount() {
    this.getHeaderData(),
      this.getArticles(),
      this.getMarkdown()
  }
}).mount("#app");

