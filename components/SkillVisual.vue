<template>
  <v-container fluid id="visual-container" class="pa-0">
    <v-row justify="center" no-gutters>
      <v-row justify="center">
        <v-col cols="auto"
          ><span style="color: #527ce9;">■</span>実務経験あり</v-col
        >
        <v-col cols="auto"
          ><span style="color: #58dbde;">■</span>開発経験あり</v-col
        >
        <v-col cols="auto"
          ><span style="color: #4deb76;">■</span>勉強中・・・</v-col
        >
        <v-col
          cols="12"
          class="text-center grey--text text--darken-1 text-subtitle-2 text-sm-subtitle-1 font-weight-regular pt-0"
          >経験年数が長いほどバブルが大きくなっています．</v-col
        >
      </v-row>
      <v-col cols="auto" id="skill" />
    </v-row>
  </v-container>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
      width: 0,
      height: 450,
      sizeRange: [40, 60],
      data: [
        { title: 'Python', yearLevel: 2, experienceLevel: 1 },
        { title: 'Javascript', yearLevel: 2, experienceLevel: 2 },
        { title: 'C', yearLevel: 2, experienceLevel: 1 },
        { title: 'HTML', yearLevel: 2, experienceLevel: 2 },
        { title: 'CSS(SASS)', yearLevel: 2, experienceLevel: 2 },
        { title: 'Typescript', yearLevel: 0, experienceLevel: 0 },
        { title: 'Flutter', yearLevel: 0, experienceLevel: 0 },
        { title: 'AWS', yearLevel: 1, experienceLevel: 1 },
        { title: 'Firebase', yearLevel: 1, experienceLevel: 1 },
        { title: 'Nuxt.js', yearLevel: 2, experienceLevel: 2 },
        { title: 'Django', yearLevel: 1, experienceLevel: 1 },
        { title: 'Vue.js', yearLevel: 2, experienceLevel: 1 },
      ],
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.width = document.querySelector('#visual-container').clientWidth
    this.generateSkillArt()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.width = document.querySelector('#visual-container').clientWidth
      this.generateSkillArt()
    },
    generateSkillArt() {
      d3.select('svg').remove()
      const xRandom = this.width * Math.random()
      const yRandom = this.height * Math.random()
      const nodesData = []
      const radiusScale = d3.scaleLinear().domain([0, 2]).range(this.sizeRange)
      const colorScale = d3
        .scaleOrdinal()
        .domain([0, 2])
        .range([
          'rgba(33,230,85,0.8)',
          'rgba(39,92,227,0.8)',
          'rgba(47,211,214,0.8)',
        ])

      const svg = d3
        .select('#skill')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)

      for (let i = 0; i < this.data.length; i++) {
        nodesData.push({
          x: xRandom,
          y: yRandom,
          r: radiusScale(this.data[i].yearLevel),
          yearLevel: this.data[i].experienceLevel,
          txt: this.data[i].title,
        })
      }

      const nodeGroup = svg
        .selectAll('g')
        .data(nodesData)
        .enter()
        .append('g')
        .call(
          d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        )

      nodeGroup
        .append('circle')
        .attr('cx', (d) => {
          return d.x
        })
        .attr('cy', (d) => {
          return d.y
        })
        .attr('r', (d) => {
          return d.r
        })
        .attr('fill', (d) => {
          return colorScale(d.yearLevel)
        })

      nodeGroup
        .append('text')
        .attr('x', (d) => {
          return d.x
        })
        .attr('y', (d) => {
          return d.y
        })
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', '#fff')
        .style('font-weight', 'bold')
        .text((d) => {
          return d.txt
        })

      const simulation = d3
        .forceSimulation()
        .force(
          'collide',
          d3.forceCollide().radius((d) => {
            return d.r
          })
        )
        .force('charge', d3.forceManyBody())
        .force(
          'x',
          d3
            .forceX()
            .strength(0.03)
            .x(this.width / 2)
        )
        .force(
          'y',
          d3
            .forceY()
            .strength(0.03)
            .y(this.height / 2)
        )

      simulation.nodes(nodesData).on('tick', ticked)

      function ticked() {
        nodeGroup
          .select('circle')
          .attr('cx', (d) => {
            return d.x
          })
          .attr('cy', (d) => {
            return d.y
          })
        nodeGroup
          .select('text')
          .attr('x', (d) => {
            return d.x
          })
          .attr('y', (d) => {
            return d.y
          })
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.5).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0.2)
        d.fx = null
        d.fy = null
      }
    },
  },
}
</script>

<style scoped></style>
