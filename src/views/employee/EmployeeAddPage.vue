<template>
    <page-container title="人力资源档案登记">
        <div>
            <el-form :model="form" :rules="rules" ref="hrForm" label-width="100px"
                action="/hr/hr_archives_manage/hr_archives_register" method="post">
                <!-- 第一行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="I级机构" prop="level_inst">
                            <el-select v-model="form.level_inst" placeholder="请选择">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅱ级机构" prop="level_inst">
                            <el-select v-model="form.level_inst" placeholder="请选择">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅲ级机构" prop="level_inst">
                            <el-select v-model="form.level_inst" placeholder="请选择">

                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="职位分类" prop="position_category">
                            <el-select v-model="form.position_category" placeholder="请选择">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位名称" prop="position_name">
                            <el-select v-model="form.position_name" placeholder="请选择">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第三行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="头像" prop="name">
                            <el-upload class="avatar-uploader"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="form.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
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
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model="form.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第五行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机" prop="mobile">
                            <el-input v-model="form.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="住址" prop="address">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮编" prop="Postcode">
                            <el-input v-model="form.postcode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第六行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="国籍" prop="country">
                            <el-input v-model="form.country"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生地" prop="birthplace">
                            <el-input v-model="form.birthplace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker v-model="form.birthday" type="date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年龄" prop="eage">
                            <el-input v-model="form.eage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="爱好" prop="eHobby">
                            <el-input v-model="form.eHobby"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="民族" prop="nation">
                            <el-input v-model="form.nation"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宗教信仰" prop="religion">
                            <el-input v-model="form.religion"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="政治面貌" prop="political_status">
                            <el-input v-model="form.political_status"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第八行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号" prop="marital_status">
                            <el-input v-model="form.eIDcard" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="社会保障号码" prop="eSSC">
                            <el-input v-model="form.eSSC"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第九行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历" prop="education">
                            <el-input v-model="form.education"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="form.major"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特长" prop="eSpecicalty">
                            <el-input v-model="form.eSpecicalty"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第十行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="薪酬标准" prop="eSalary">
                            <el-select v-model="form.eSalary" placeholder="请选择">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户银行" prop="eBankName">
                            <el-input v-model="form.eBankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号" prop="eBankAccount">
                            <el-input v-model="form.eBankAccount" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="简历" prop="eResume">
                            <el-input v-model="form.eResume" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="家庭关系" prop="eFamily">
                            <el-input v-model="form.eFamily" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="eRemarks">
                            <el-input v-model="form.eRemarks" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <el-form-item label="登记人：">
                    <el-input v-model="form.eRecoders" disabled="true"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-button class="button_submit" type="primary" @click="submitForm">提交</el-button>
            </el-form>
        </div>
    </page-container>
</template>

<script>
import { useUserStore } from '@/stores';
const userStore = useUserStore();

export default {
    data() {
        return {
            form: {
                eRecoders : "-1",
            },
            rules: {
                level_inst: [{ required: true, message: "请选择工级机构", trigger: "change" }],
                position_category: [{ required: true, message: "请选择职位分类", trigger: "change" }],
                position_name: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
                title: [{ required: true, message: "请输入职称", trigger: "blur" }],
                // 添加其他字段的校验规则
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.hrForm.validate((valid) => {
                if (valid) {
                    // 提交表单逻辑
                } else {
                    console.log("表单校验失败");
                    return false;
                }
            });
        },
    },
    mounted(){
        this.form.eRecoders = userStore.user.uid;
    }
};
</script>
  
<style scoped>
.avatar-uploader-icon{
    width: 64px;
    height: 64px;
    border: 1px solid;
}

.button_submit {
    width: 30%;
    margin: 0 auto; /* 将左右边距设置为auto，使按钮水平居中 */
    display: block; /* 使按钮成为块级元素，以便设置宽度和自动居中 */
}

</style>
  