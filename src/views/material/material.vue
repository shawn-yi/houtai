<template>
  <!--卡片区-->
  <el-card class="box-card">
    <!--命名插槽，头部内容设置-->
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        style="float: right; padding: 3px 0"
        :headers="setToken"
        name="image"
        :show-file-list="false"
        :on-success="onsuccess"
      >
        <el-button size="small" type="primary">上传素材</el-button>
      </el-upload>
    </div>
    <!--匿名插槽，卡片主体内容-->
    <div class="text item">
      <ul>
        <li class="image-box" v-for="item in imageList" :key="item.id">
          <img :src="item.url" alt />
          <div class="image-bot">
            <el-button type="success" icon="el-icon-star-off" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imageList: [],
      querycdt: {
        collect: false,
        page: 1,
        per_page: 20
      }
    }
  },
  computed: {
    setToken () {
      let token = JSON.parse(window.sessionStorage.getItem('token')).token
      return { Authorization: 'Bearer ' + token }
    }
  },
  created () {
    this.getImageList()
  },
  methods: {
    onsuccess () {
      this.$message.success('素材上传成功')
      this.getImageList()
    },
    getImageList () {
      let pro = this.$http.get('/user/images', { params: this.querycdt })
      pro
        .then(result => {
          //   console.log(result)
          if (result.data.message === 'OK') {
            this.imageList = result.data.data.results
          }
        })
        .catch(err => {
          return this.$message.error('获取素材失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.image-box {
  list-style: none;
  width: 200px;
  height: 200px;
  background-color: #fff;
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  img {
    width: 200px;
    height: 140px;
  }
  .image-bot {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
