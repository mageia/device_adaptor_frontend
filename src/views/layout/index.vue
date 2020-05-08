<template>
    <div class="app-wrapper" :class="{hideSidebar:isCollapse}" @mouseenter="updateStatus">
        <el-menu class="navbar" mode="horizontal">
            <div class="logo-wrap">
<!--                <img class="logo" src="@/assets/img/logo-gateway-white.png">-->
                <!-- <h4 v-if="!isCollapse">华夏天信集团</h4> -->
            </div>

            <i class="fa fa-bars" @click="toggleMenu()" :isActive="isCollapse"></i>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <span class="user-name">admin</span>
                    <img class="user-avatar" src="@/assets/img/avatar.png">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <!-- <router-link class='inlineBlock' to="/index/personalInfo">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link> -->
                    <el-dropdown-item>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
        <div class="sidebar-wrapper">
            <el-menu default-active="/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" mode="vertical" background-color="#242A3E" text-color="#909399" active-text-color="#fff" :router="true">
                <el-menu-item index="/home">
                    <i class="el-icon-view" style="font-size: 20px;"></i>
                    <span slot="title">&nbsp;&nbsp;首页</span>
                </el-menu-item>
                <el-menu-item index="/input/index">
                    <i class="el-icon-upload2" style="font-size: 20px;"></i>
                    <span slot="title">&nbsp;&nbsp;数据接入</span>
                </el-menu-item>
                <el-menu-item index="/output/index">
                    <i class="el-icon-download" style="font-size: 20px;"></i>
                    <span slot="title">&nbsp;&nbsp;数据输出</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-container">
            <!-- <App-main/> -->
            <section class="app-main" style="min-height: 100%">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </section>

        </div>
    </div>
</template>

<script>
export default {
    name: "layout",
    data() {
        return {
            isCollapse: false,
            logoUrl: "@/assets/img/logo-tx-dark.png"
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toggleMenu() {
            this.isCollapse = !this.isCollapse;
        },
        updateToken() {
            this.$store.dispatch("user/updateToken");
        },
        logout() {
            this.$store.dispatch("user/Logout");
            this.$router.push("/login");
        },
        updateStatus() {
            console.log("enter");
        }
    },
    mounted() {
        let timer = null;
        timer = setInterval(() => {
            this.updateToken();
        }, 60000 * 5);
    }
};
</script>

<style rel="stylesheet/scss" lang="less" scoped>
@import "~@/assets/less/mixin.less";

.app-wrapper {
    // @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.hideSidebar {
        .sidebar-wrapper {
            width: 64px;
            /* transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                } */
        }

        .main-container {
            margin-left: 64px;
        }

        .navbar .logo-wrap {
            width: 64px;
            padding-left: 16px;
        }
    }

    .sidebar-wrapper {
        width: 180px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        transition: all 0.28s ease-out;
        background: #242a3e;
        padding-top: 50px;

        .el-menu {
            border: 0;

            .el-menu-item.is-active {
                background-color: #0f1332 !important;
                border-right: solid 4px #418cdd;
            }
        }
    }

    .shrink-sidebar-wrapper {
        width: 64px;
    }

    .sidebar-container {
        transition: all 0.28s ease-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
    }

    .main-container {
        min-height: 100%;
        margin-top: 50px;
        transition: all 0.28s ease-out;
        margin-left: 180px;
        background: #f5f6fa;
    }

    /* nav bar */
    .navbar {
        width: 100%;
        position: fixed;
        z-index: 1002;
        left: 0;
        top: 0;
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        background: #fff;

        .logo-wrap {
            float: left;
            width: 180px;
            height: 50px;
            padding: 14px 0 13px 12px;
            color: #fff;
            background: #242a3e;

            h4 {
                float: left;
                padding: 0;
                margin: 0;
                line-height: 30px;
            }

            img {
                float: left;
                height: 23px;
                width: auto;
                margin-right: 10px;
                vertical-align: middle;
            }
        }

        .fa-bars {
            cursor: pointer;
            line-height: 50px;
            width: 50px;
            height: 50px;
            float: left;
            padding: 0 15px;
            text-align: center;
            color: #444;
            font-size: 20px;
            outline: none;
        }

        .fa-bars[isactive] {
            transform: rotate(90deg);
        }

        .hamburger-container {
            line-height: 50px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }

        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }

        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;

            .avatar-wrapper {
                cursor: pointer;
                /* margin-top:5px;*/
                padding: 9px 5px;
                position: relative;
                height: 50px;
                line-height: 32px;
                outline: none;

                .user-name {
                    float: left;
                    margin-right: 5px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }

                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 20px;
                    font-size: 12px;
                }
            }
        }
    }

    .el-menu--horizontal {
        border-bottom: 0;
    }
}
</style>
