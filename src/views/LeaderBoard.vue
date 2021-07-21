<template>
  <div class="leader-board">
    <div class="leaderboard-left">
      <div class="leaderboard-left-selector">
        
        <span>时间</span>
        <el-radio-group v-model="query.time">
          <el-tooltip v-for="i in timeFilter" :key="i">
             <el-radio-button
              :label="i"
              :value="i"
            />
          </el-tooltip>
        </el-radio-group>
        <span>排序</span>
        <el-radio-group v-model="query.type">
          <el-radio-button
            v-for="i in typeFilter"
            :key="i"
            :label="i"
            :value="i"
          />
        </el-radio-group>
      </div>
      <div class="leaderboard-left-main"></div>
    </div>
    <div class="leaderboard-right">
      <div class="leaderboard-right-main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderBoard',
  components: {
    
  },
  data() { 
    return {
      query:{
        time: "全部",
        type: "总点赞数"
      },
      timeFilter: [
        "全部",
        "本月",
        "本周",
        "今天"
      ],
      typeFilter: [
        "总点赞数",
        "点赞数",
        "引用次数"
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
  * {
    box-sizing: border-box;
  }

  .leader-board{
    width: 100%;
  }

  .leaderboard-left, .leader-board-right {
    float: left;
    padding: 20px;
    height: 900px;
  }

  .leaderboard-right {
    width: 30%;
  }

  .leaderboard-left {
    width: 60%;
    background-color: #fafafa;
  }

  @media screen and (max-width: 800px) {
    .leaderboard-left, .leader-board-right {
      clear: both;
      width: 100%;
      margin: auto;
    }
  }

  .leaderboard-left-selector {
    display: inline-block;
    font-size: 1.4rem;
  }

  .leaderboard-left-selector span {
    /* font-size: pad; */
    padding: 0 2rem;
  }



</style>