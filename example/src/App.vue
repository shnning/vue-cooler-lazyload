<script>
export default {
  props: ['count'],
  data() {
    return {
      imageList: [
        'https://cdn.shibe.online/shibes/96f4109cd1caeb64ed41a52fca0c781030243fb9.jpg',
        'https://cdn.shibe.online/shibes/9f7f0ddf9baec379b12d7b13ef20c28950f17a5a.jpg',
        'https://cdn.shibe.online/shibes/407fe4557de5db48fbc7a728b5631e6588eb404e.jpg',
        'https://cdn.shibe.online/shibes/b93c568b21261925687ea0e0aea882cb7d01b7da.jpg',
        'https://cdn.shibe.online/shibes/7f831fe19f027c717bb6e965d00e676993fecd4a.jpg',
        'https://cdn.shibe.online/shibes/ada3d3ea9c39e7c353c052a0bc3e37f06c53e638.jpg',
        'https://cdn.shibe.online/shibes/921c5f55102243806455719b024c1d63567e45c3.jpg',
        'https://cdn.shibe.online/shibes/5edf51877ef2fe3e09520ad7c1b81a43e7cc950f.jpg',
        'https://cdn.shibe.online/shibes/c423a905ec68423a47970499514655544a3843fa.jpg',
        'https://cdn.shibe.online/shibes/ed2b21dbb05c6a546b94f86e163bab9e3368279d.jpg',
      ],
    };
  },
  render() {
    const { imageList, count } = this;
    console.log(imageList);
    return (
      <div>
        <div class="first-screen">
          FIRST SCREEN
          <div class="mark">-------------</div>
        </div>
        <div class="imgs-contanier">
          {imageList.map(img =>  <img class="lazyload-img" v-lazyload={img} />)}
        </div>
        <div class="img-loaded">
          <span id="img-number">{count}</span>张图片已加载
        </div>
      </div>
    );
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.first-screen {
  height: 1500px;
  width: 100%;
  background-color: blue;
  color: white;
  position: relative;
  font-size: 100px;
}

.mark {
  position: absolute;
  top: 1350px;
}

.imgs-contanier {
}

.lazyload-img {
  width: auto;
  height: auto;
  min-height: 200px;
  min-width: 300px;
  display: block;
}

.img-loaded {
  position: fixed;
  right: 0;
  top: 0;
  width: 200px;
  height: 50px;
  font-size: 30px;
  background: black;
  color: white;
}
</style>
