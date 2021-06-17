<template>
  <div>
    <div class="px-2 pt-2">
      <div class="row">
        <div class="col" style="color: red">
          <i class="el-icon-date"></i> Upcoming Events
        </div>
      </div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <div
            class="all-niches-carousel clickable"
            :style="{
              backgroundImage:
                'url(https://pokemongolive.com/img/posts/anniversaryposter2019.jpg)',
              backgroundPosition: 'center',
            }"
            @click="jumpToSpace(item.groupId)"
          >
            <h2 class="py-4" style="color: white; text-align: center">
              Event Title Here + some CSS to look good
            </h2>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="pt-2">
      <el-card class="box-card" style="border-radius: 4px" shadow="hover">
        <h5>Your Events</h5>
        <el-table
          ref="filterTable"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.space.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column
            label="Date"
            prop="date"
            sortable
            width="120"
            column-key="date"
          >
          </el-table-column>
          <el-table-column label="Space" prop="space" width="150">
          </el-table-column>
          <el-table-column
            label="Details"
            prop="details"
            min-width="300"
            :formatter="formatter"
          >
          </el-table-column>
          <el-table-column
            label="Status"
            prop="status"
            sortable
            width="100"
            :filters="[
              { text: 'Going', value: 'Going' },
              { text: 'Interested', value: 'Interested' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template v-slot="scope">
              <el-tag
                :type="scope.row.status === 'Going' ? 'success' : 'primary'"
                disable-transitions
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="right" width="180">
            <template v-slot:header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="Search by Space"
              />
            </template>
            <template v-slot="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getConfig } from "element-plus/lib/utils/config";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          space: "CSGO",
          details:
            "There is a new kid on the scene - Hoang TBP. Seems really good, but is he really good enough to beat our master GW?There is a new kid on the scene - Hoang TBP. Seems really good, but is he really good enough to beat our master GW?",
          status: "Going",
        },
        {
          date: "2016-05-02",
          space: "Ramen Lovers",
          details:
            "let's disucss more about chicken ramens dude. i just dont think its legitlet's disucss more about chicken ramens dude. i just dont think its legitlet's disucss more about chicken ramens dude. i just dont think its legitlet's disucss more about chicken ramens dude. ",
          status: "Going",
        },
        {
          date: "2016-05-04",
          space: "Morgan",
          details: "No. 189, Grove St, Los Angeles",
          status: "Going",
        },
        {
          date: "2016-05-01",
          space: "Jessy",
          details:
            "There is a new kid on the scene - Hoang TBP. Seems really good, but is he really good enough to beat our master GW?There is a new kid ",
          status: "Interested",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.status === value;
    },
  },
};
</script>

<style>
@import "../../assets/styles/niched-styles.css";
</style>
