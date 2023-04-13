<template>
  <div class="menu-wrapper">
    <ul>
      <li v-for="(item, index) in menuConfig" :key="index" :title="item.title" :data-testid="`first-level-${item.title.toLowerCase()}`">
        {{ item.title }}
          <button v-if="item.subItems" @click.prevent="handleMenuClick(item.subItems, $event)" :id="`second-level-${item.title.toLowerCase()}`">Expand</button>
        <ul v-if="subMenu && isExpand">
          <li v-for="(subitem, subindex) in subMenu" :key="subindex">
            <a>{{ subitem }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menuConfig: [],
  },
  data() {
    return {
     isExpand: false,
     subMenu: []
    }
  },
  methods: {
    handleMenuClick(item, event) {
      const targetId = event.currentTarget.id;
      alert(targetId)
      this.subMenu = item
      this.isExpand = true
      // handle click event for menu item
    }
  }
}
</script>

<style scoped>
.submenu-icon {
  font-size: 0.8em;
  margin-left: 5px;
}
ul {
  list-style: none;
  padding-left: 0;
}
li {
  margin-bottom: 5px;
}
ul ul {
  padding-left: 20px;
}
a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
}
a:hover {
  color: #555;
}
</style>
