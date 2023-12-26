<template>
    <page-container title="职位管理">
        <div>
            <el-card>
                <el-button v-if="permissions.indexOf('position.add') > -1 ||
                    permissions.indexOf('position.*') > -1
                    " type="primary" @click="addPosition" style="margin-bottom: 20px">新增职位</el-button>

                <div>
                    <el-input style="width: 200px" prop="pID"></el-input>
                    <el-button style="margin-right: 20px">按id搜索职位</el-button>
                    <el-input style="width: 200px"></el-input>
                    <el-button>按分类搜索职位</el-button>
                </div>
            </el-card>
            <el-table :data="position" style="width: 100%">
                <el-table-column prop="pid" label="职位ID"></el-table-column>
                <el-table-column prop="pname" label="职位名称"></el-table-column>
                <el-table-column prop="pcategory" label="职位分类"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="editPosition(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="removePosition(scope.row.pid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog v-model="dialogVisible" :title="optionKey + '职位'">
                <el-form :model="currentMenu" :rules="positionRules" ref="positionForm" label-width="80px">
                    <el-form-item label="职位 ID" prop="pid" v-if="optionKey === '编辑'">
                        <el-input v-model="currentMenu.pid"></el-input>
                    </el-form-item>
                    <el-form-item label="职位名称" prop="pname">
                        <el-input v-model="currentMenu.pname"></el-input>
                    </el-form-item>
                    <el-form-item label="职位分类" prop="pcategory">
                        <el-input v-model="currentMenu.pcategory"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="savePosition">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </page-container>
</template>
  
<script>
import * as positionApi from '../../api/position'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

export default {
    data() {
        return {
            position: [],
            dialogVisible: false,
            currentMenu: {},
            positionRules: {
                pname: [
                    { required: true, message: '职位名称为必填项', trigger: 'blur' }
                ],
                pcategory: [
                    { required: true, message: '职位分类是必需的', trigger: 'blur' }
                ]
            },
            permissions: [],
            optionKey: '' // 操作key
        }
    },
    methods: {
        getAllPosition() {
            positionApi
                .getPositionListService()
                .then((response) => {
                    this.position = response.data.data
                })
                .catch((error) => {
                    console.error('Error fetching position:', error)
                })
        },
        addPosition() {
            this.currentMenu = {}
            this.optionKey = '新增'
            this.dialogVisible = true
        },

        editPosition(position) {
            this.currentMenu = { ...position }
            this.optionKey = '编辑'
            this.dialogVisible = true
        },
        savePosition() {
            this.$refs.positionForm.validate((valid) => {
                if (valid) {
                    if (this.currentMenu.pid) {
                        positionApi.updatePositionService(this.currentMenu)
                            .then(() => {
                                ElMessage.success('菜单更新成功')
                                this.getAllPosition()
                                this.dialogVisible = false
                            })
                            .catch((error) => {
                                console.error('更新菜单时出错:', error)
                            })
                    } else {
                        positionApi
                            .addPositionService(this.currentMenu)
                            .then(() => {
                                ElMessage.success('菜单添加成功')
                                this.getAllPosition()
                                this.dialogVisible = false
                            })
                            .catch((error) => {
                                console.error('添加菜单时出错:', error)
                            })
                    }
                } else {
                    ElMessage.error('验证失败')
                }
            })
        },
        removePosition(id) {
            ElMessageBox.confirm('你确定要删除吗?', '注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning', // Adjust the type based on your design preference
            })
                .then(() => {
                    // User clicked '确定'
                    positionApi
                        .removePositionService(id)
                        .then(() => {
                            ElMessage.success('已成功删除职位');
                            this.getAllPosition();
                        })
                        .catch((error) => {
                            console.error('删除职位时出错:', error);
                        });
                })
                .catch(() => {
                    // User clicked '取消' or closed the dialog
                    // No action needed
                });

        },
    },

    searchId() { },
    searchCategory() { },
    mounted() {
        this.getAllPosition()
        this.permissions = userStore.auth.permission
    }
}
</script>
  
<style></style>