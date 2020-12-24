<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败请点击重试"
    @load="onload"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comments";
import commentItem from "./comment-item";

export default {
  name: "CommentList",
  components: {
    commentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  created() {
    this.loading = true;
    this.onload();
  },
  methods: {
    async onload() {
      try {
        // 1.请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        // 2.将数据添加到列表中
        const { results } = data.data;
        this.list.push(...results);
        // 把文章评论的总数传递到外部
        this.$emit("onload-success", data.data);
        // 3.将loading 设置为false
        this.loading = false;
        // 4.判断是否还有数据
        if (results.length) {
          //    有数据就更新下一页的数据页码
          this.offset = data.data.last_id;
        } else {
          //    没有就将finished设置为false
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
