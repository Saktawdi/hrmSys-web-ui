<template>
    <page-container title="人力资源档案登记">
        <div>
            <el-form :model="form" :rules="rules" ref="hrForm" label-width="100px"
                action="/hr/hr_archives_manage/hr_archives_register" method="post">
                <!-- 第一行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="I级机构" prop="el1InstID">
                            <el-select v-model="form.el1InstID" placeholder="请选择"
                                @change="chooseInstitution(1, form.el1InstID)">
                                <el-option v-for="item in institution[0]" :key="item.iid" :label="item.iname"
                                    :value="item.iid" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅱ级机构" prop="el2InstID">
                            <el-select v-model="form.el2InstID" placeholder="请先选择上级机构"
                                @change="chooseInstitution(2, form.el2InstID)">
                                <el-option v-for="item in institution[1]" :key="item.iid" :label="item.iname"
                                    :value="item.iid" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅲ级机构" prop="el3InstID">
                            <el-select v-model="form.el3InstID" placeholder="请先选择上级机构">
                                <el-option v-for="item in institution[2]" :key="item.iid" :label="item.iname"
                                    :value="item.iid" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="职位分类" prop="epositionCategory">
                            <el-select v-model="form.epositionCategory" placeholder="请选择" @change="updatePositions">
                                <el-option v-for="(positions, category) in position" :key="category" :label="category"
                                    :value="category">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位名称" prop="epositionName">
                            <el-select v-model="form.epositionName" placeholder="请先选择分类">
                                <!-- positions -->
                                <el-option v-for="pname in selectedPositions" :key="pname" :label="pname" :value="pname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" prop="ejobTitle">
                            <el-input v-model="form.ejobTitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第三行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader" action="https://www.freeimg.cn/api/v1/upload"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload" :headers="headerObj">
                                <img v-if="form.eavatar" :src="form.eavatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="ename">
                            <el-input v-model="form.ename"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="egender">
                            <el-select v-model="form.egender">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第四行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="EMAIL" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="固定电话" prop="efixedPhone">
                            <el-input v-model="form.efixedPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="QQ" prop="eqq">
                            <el-input v-model="form.eqq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第五行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机" prop="ecellPhone">
                            <el-input v-model="form.ecellPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="住址" prop="eaddress">
                            <el-input v-model="form.eaddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮编" prop="epostcode">
                            <el-input v-model="form.epostcode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第六行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="国籍" prop="ecountry">
                            <el-input v-model="form.ecountry"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生地" prop="ebirthplace">
                            <el-input v-model="form.ebirthplace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="生日" prop="ebirthday">
                            <el-date-picker v-model="form.ebirthday" type="date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年龄" prop="eage">
                            <el-input v-model="form.eage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="爱好" prop="ehobby">
                            <el-input v-model="form.ehobby"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="民族" prop="eethnic">
                            <el-select v-model="form.eethnic">
                                <el-option label="汉" value="汉"></el-option>
                                <el-option label="回" value="回"></el-option>
                                <el-option label="满" value="满"></el-option>
                                <el-option label="藏" value="藏"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宗教信仰" prop="ereligion">
                            <el-input v-model="form.ereligion"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="政治面貌" prop="epolitical">
                            <el-input v-model="form.epolitical"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第八行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号" prop="eidcard">
                            <el-input v-model="form.eidcard" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="社会保障号码" prop="essc">
                            <el-input v-model="form.essc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第九行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历" prop="eeducation">

                            <el-select v-model="form.eeducation">
                                <el-option label="博士" value="博士"></el-option>
                                <el-option label="硕士" value="硕士"></el-option>
                                <el-option label="本科" value="本科"></el-option>
                                <el-option label="专科" value="专科"></el-option>
                                <el-option label="高中" value="高中"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业" prop="emajor">
                            <el-input v-model="form.emajor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特长" prop="especicalty">
                            <el-input v-model="form.especicalty"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第十行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="薪酬标准" prop="esalary">
                            <el-select v-model="form.esalary" placeholder="请选择">
                                <el-option v-for="item in salaryBasic" :key="item.sid" :label="item.sbasic"
                                    :value="item.sid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户银行" prop="ebankName">
                            <el-input v-model="form.ebankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号" prop="ebankAccount">
                            <el-input v-model="form.ebankAccount" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="简历" prop="eresume">
                            <el-input v-model="form.eresume" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="家庭关系" prop="efamily">
                            <el-input v-model="form.efamily" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="eremarks">
                            <el-input v-model="form.eremarks" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <el-form-item label="登记人：">
                            <el-input v-model="form.erecoders" disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-button class="button_submit" type="primary" @click="submitForm">提交</el-button>
            </el-form>
        </div>
    </page-container>
</template>

<script>
import * as employeeApi from "../../api/employee";
import * as institution from "../../api/institution"
import * as position from "../../api/position"
import * as salary from "../../api/salary"

import { useUserStore } from '@/stores';
const userStore = useUserStore();

export default {
    data() {
        return {
            form: {
                erecoders: "-1",
                eavatar: "",
                egender: "男",
                eethnic: "汉",
                eeducation: "本科",
            },
            rules: {
                el1InstID: [{ required: true, message: "请选择Ⅰ级机构", trigger: "change" }],
                el2InstID: [{ required: true, message: "请选择Ⅱ级机构", trigger: "change" }],
                el3InstID: [{ required: true, message: "请选择Ⅲ级机构", trigger: "change" }],
                epositionCategory: [{ required: true, message: "请选择职位分类", trigger: "change" }],
                epositionName: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
                ejobTitle: [{ required: true, message: "请输入职称", trigger: "blur" }],
                ename: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                esalary: [{ required: true, message: "请选择薪资标准", trigger: "blur" }],
                // 添加其他字段的校验规则
            },
            headerObj: {
                'Authorization': 'Bearer 58|vQd3PIUYEH4X2a02ryBr4TyXjcGOEPQiHP83Xw8v'
            },
            institution: [
                [],
                [],
                []
            ],//机构列表,1,2,3级
            position: [],// 职位分类下的列表
            selectedPositions: [], // 选定的职位的数据属性
            salaryBasic: [] // 基础薪酬工资
        };
    },
    methods: {
        handleAvatarSuccess(response, file) {
            if (response.status === true) {
                console.log('Avatar uploaded successfully:', response.data.links.url);
                ElMessage.success("上传头像成功")
                this.form.eavatar = response.data.links.url;
            } else {
                ElMessage.error('上传头像失败');
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJPG) {
                ElMessage.error('头像图片必须为JPG或PNG格式');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                ElMessage.error('头像图片大小必须小于2MB');
            }
            return isJPG && isLt2M;
        },
        fetchInstitutionByLevel(level, pid) {
            if (level === 1) {
                institution.getInstitutionByLevelService(level)
                    .then((response) => {
                        this.institution[level - 1] = response.data.data;
                    })
                    .catch((error) => {
                        console.error(`获取级别的机构数据时出错 ${level}:`, error);
                    });
            } else {
                institution.getInstitutionByLevelAndParentService(level, pid)
                    .then((response) => {
                        this.institution[level - 1] = response.data.data;
                    })
                    .catch((error) => {
                        console.error(`获取级别的机构数据时出错 ${level}:`, error);
                    });
            }
        },
        chooseInstitution(level, pid) {
            if (level === 1) {
                this.form.el2InstID = ""
                this.form.el3InstID = ""
                this.institution[2] = [];
            }
            if (level === 2) {
                this.form.el3InstID = ""
            }
            console.log("choose:", pid)
            this.fetchInstitutionByLevel(level + 1, pid);
        },

        fetchPositionList() {
            position.getPositionListService()
                .then((response) => {
                    //根据pCategory分类：
                    //遍历response 根据 pcategory 赋值  this.position.{$pcategory}.pname
                    //数据结构如下：
                    // this.position = [
                    //     {"pcategory1" : ["pname1","pname2"]},
                    //     {"pcategory2" : ["pname3","pname8"]},
                    // ]
                    const positions = response.data.data;
                    const categorizedPositions = {};
                    positions.forEach((position) => {
                        const { pcategory, pname } = position;
                        if (!categorizedPositions[pcategory]) {
                            categorizedPositions[pcategory] = [];
                        }
                        categorizedPositions[pcategory].push(pname);
                    });
                    this.position = categorizedPositions;
                })
                .catch((error) => {
                    console.error('Error fetching position list:', error);
                });
        },
        updatePositions() {
            this.selectedPositions = this.position[this.form.epositionCategory] || [];
            this.form.epositionName = '';
        },

        fetchSalaryList() {
            salary.getAllSalariesByStatusService(1)
                .then((response) => {
                    this.salaryBasic = response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching salary list:', error);
                });
        },

        submitForm() {
            this.$refs.hrForm.validate((valid) => {
                if (valid) {
                    employeeApi.addEmployeeService(this.form).then(() => {
                        ElMessage.success("员工档案添加成功");
                        this.form = {}
                    }).catch((error) => {
                        console.error("员工档案添加失败", error);
                        ElMessage.error("添加员工档案失败。请再试一次。");
                    });
                } else {
                    console.log("表单校验失败");
                    return false;
                }
            });
        },
    },
    mounted() {
        this.form.erecoders = userStore.user.uid;
        this.fetchInstitutionByLevel(1);
        this.fetchPositionList();
        this.fetchSalaryList();
    },
    watch: {
        'form.epositionCategory': 'updatePositions',
    }
};
</script>
  
<style scoped>
.avatar{
    max-height: 64px;
    max-width: 64px;
}
.avatar-uploader-icon {
    width: 64px;
    height: 64px;
    border: 1px solid;
}

.button_submit {
    width: 30%;
    margin: 0 auto;
    /* 将左右边距设置为auto，使按钮水平居中 */
    display: block;
    /* 使按钮成为块级元素，以便设置宽度和自动居中 */
}
</style>
  