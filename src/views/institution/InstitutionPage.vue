<template>
    <page-container title="机构管理">
        <div>
            <el-card>
                <el-button v-if="permissions.indexOf('institution.add') > -1 ||
                    permissions.indexOf('institution.*') > -1
                    " type="primary" @click="addInstitution">新增机构</el-button>
            </el-card>
            <el-table :data="institutionTree" lazy :load="loadData" row-key="iid"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="iid" label="机构编号"></el-table-column>
                <!-- <el-table-column prop="iparent" label="父级机构"></el-table-column> -->
                <el-table-column prop="ilevel" label="机构等级">
                    <template #default="scope">
                        <el-tag :type="getTagType(scope.row.ilevel)">{{ scope.row.ilevel }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="iname" label="机构名称"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="success" plain @click="plusInstitution(scope.row)">新增下级</el-button>
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
            institutionTree: [],//符合组件要求的树型数据结构
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
            optionKey: '',// 操作key
            loding: true // 加载
        }
    },
    mounted() {
        this.getAllInstitution()
        this.permissions = userStore.auth.permission
    },
    methods: {
        getTagType(ilevel) {
            switch (ilevel) {
                case 1:
                    return 'danger';
                case 2:
                    return 'warning';
                case 3:
                    return 'success';
                default:
                    return 'info';
            }
        },
        getAllInstitution() {
            institutionApi
                .getAllInstitutionsService()
                .then((response) => {
                    this.institution = response.data.data;
                    this.institutionTree = this.institution;
                    //先求出顶层节点到Tree数据结构
                    this.findFirstLevel(this.institution)
                })
                .catch((error) => {
                    console.error('获取机构时出错:', error)
                })
        },
        findFirstLevel(list) {
            // 记录所有的parentId和id
            const allParentId = [];
            const allId = [];
            list.forEach((item) => {
                if (!allParentId.includes(item.iparent)) {
                    allParentId.push(item.iparent);
                }
                if (!allId.includes(item.iid)) {
                    allId.push(item.iid);
                }
            });
            // 先筛选出 父节点在所有数据中不存在的 --无父节点 --顶层节点
            this.institutionTree = list.filter((item) => !allId.includes(item.iparent));
            // 再判断顶级节点是否有孩子 --hasChildren的值的判断
            this.institutionTree.forEach((item) => {
                if (allParentId.includes(item.iid)) {
                    item.hasChildren = true;
                }
            });
        },
        loadData(row, treeNode, resolve) {
            resolve(this.flagChildren(this.institution, row));
        },
        //判断数组中有没有自己的孩子 -- 返回一个加上是否有孩子标识字段的孩子数组
        flagChildren(list, parentItem, config = {}) {
            // list是扁平化数组  parentItem是点击的行的数据对象 config是参数配置
            config = Object.assign({}, { iid: "iid", iparent: "iparent" }, config);
            const allParentId = [];
            list.forEach((item) => {
                if (!allParentId.includes(item[config.iparent])) {
                    allParentId.push(item[config.iparent]);
                }
            });
            // 筛选出是这个节点孩子的 节点的数组
            const childrenArr = list.filter((item) => {
                return item[config.iparent] == parentItem[config.iid];
            });
            childrenArr.forEach((item) => {
                // console.log("遍历孩子对象：",item)
                if (allParentId.includes(item[config.iid])) {
                    // 证明有孩子节点
                    item["hasChildren"] = true;
                }
            });
            return childrenArr;
        },
        plusInstitution(data){
            this.currentMenu = {}
            this.currentMenu.iparent = data.iid
            this.currentMenu.ilevel = data.ilevel + 1
            this.optionKey = '新增'
            this.dialogVisible = true
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
}
</script>
  
<style></style>