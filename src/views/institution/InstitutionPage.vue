<template>
    <page-container title="机构管理">
        <div>
            <el-card>
                <el-button v-if="permissions.indexOf('institution.add') > -1 ||
                    permissions.indexOf('institution.*') > -1
                    " type="primary" @click="addInstitution">新增机构</el-button>
            </el-card>
            <el-table :data="institution" style="width: 100%">
                <el-table-column prop="iid" label="序号"></el-table-column>
                <el-table-column prop="iparent" label="父级机构"></el-table-column>
                <el-table-column prop="ilevel" label="机构等级">
                    <template #default="scope">
                        <el-tag :type="getTagType(scope.row.ilevel)">{{ scope.row.ilevel }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="iname" label="机构名称"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="editInstitution(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteInstitution(scope.row.iid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog v-model="dialogVisible" :title="optionKey + '机构'">
                <el-form :model="currentMenu" :rules="institutionRules" ref="institutionForm" label-width="80px">
                    <el-form-item label="序号" prop="iid">
                        <el-input v-model="currentMenu.iid"></el-input>
                    </el-form-item>
                    <el-form-item label="父级机构" prop="iparent">
                        <el-input v-model="currentMenu.iparent"></el-input>
                    </el-form-item>
                    <el-form-item label="机构等级" prop="ilevel">
                        <el-input v-model="currentMenu.ilevel">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="iname">
                        <el-input v-model="currentMenu.iname"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveInstitution">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </page-container>
</template>
  
<script>
import { ElMessage } from 'element-plus'
import * as institutionApi from '../../api/institution'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

export default {
    data() {
        return {
            institution: [],
            dialogVisible: false,
            currentMenu: {},
            institutionRules: {
                iid: [{ required: true, message: '序号为必填项', trigger: 'blur' }],
                ilevel: [
                    { required: true, message: '机构等级为必填项', trigger: 'blur' }
                ],

                iname: [
                    { required: true, message: '机构名称是必需的', trigger: 'blur' }
                ]
            },
            permissions: [],
            optionKey: '' // 操作key
        }
    },
    methods: {
        getTagType(ilevel) {
            switch (ilevel) {
                case "1":
                    return 'danger';
                case "2":
                    return 'warning';
                case "3":
                    return 'success';
                default:
                    return 'info';
            }
        },
        getAllInstitution() {
            institutionApi
                .getAllInstitutionsService()
                .then((response) => {
                    this.institution = response.data.data
                })
                .catch((error) => {
                    console.error('Error fetching institution:', error)
                })
        },
        addInstitution() {
            this.currentMenu = {}
            this.optionKey = '新增'
            this.dialogVisible = true
        },
        editInstitution(institution) {
            this.currentMenu = { ...institution }
            this.optionKey = '编辑'
            this.dialogVisible = true
        },
        saveInstitution() {
            this.$refs.institutionForm.validate((valid) => {
                if (valid) {
                    if (this.optionKey === "编辑") {
                        institutionApi
                            .updateInstitutionService(this.currentMenu)
                            .then(() => {
                                ElMessage.success('菜单更新成功')
                                this.getAllInstitution()
                                this.dialogVisible = false
                            })
                            .catch((error) => {
                                console.error('更新菜单时出错:', error)
                            })
                    } else if (this.optionKey === "新增") {
                        institutionApi
                            .addInstitutionService(this.currentMenu)
                            .then(() => {
                                ElMessage.success('机构添加成功')
                                this.getAllInstitution()
                                this.dialogVisible = false
                            })
                            .catch((error) => {
                                console.error('添加机构时出错:', error)
                            })
                    }
                } else {
                    ElMessage.error('验证失败')
                }
            })
        },
        deleteInstitution(id) {
            ElMessageBox.confirm('你确定要删除吗?', '注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning', // Adjust the type based on your design preference
            })
                .then(() => {
                    // User clicked '确定'
                    institutionApi
                        .deleteInstitutionService(id)
                        .then(() => {
                            ElMessage.success('已成功删除机构');
                            this.getAllInstitution();
                        })
                        .catch((error) => {
                            console.error('删除机构时出错:', error);
                        });
                })
                .catch(() => {
                    // User clicked '取消' or closed the dialog
                    // No action needed
                });
        },
    },
    getInstitutionByiParent(iparent) {
        institutionApi
            .getInstitutionByiParentService(iparent)
            .then(() => {
                ElMessage.success('成功获取父类信息')
                this.getAllInstitution()
            })
            .catch((error) => {
                console.error('获取父类信息时出错:', error)
            })
    },
    //TODO:根据机构编号判断是否为父类
    //TODO:根据父类ID获取机构详细信息
    //TODO:根据等级和父类ID获取机构详细信息
    //TODO:根据机构编号获取详细信息
    //TODO:根据等级获取机构详细信息
    mounted() {
        this.getAllInstitution()
        this.permissions = userStore.auth.permission
    }
}
</script>
  
<style></style>