import Mock from "mockjs";

Mock.setup({ timeout: "1200-2600" });

Mock.mock(/\/todoList/,'get', {
	code: 0,
	data: {
		"list|1-10": [
			{
				// 属性 id 是一个自增数，起始值为 1，每次增 1
				"id|+1": 1,
				title: '@string',
				status: 1
			}
		]
	},
	message: "操作成功",
	systemDate: new Date().getTime()
});

Mock.mock('/user','get', {
	code: 0,
	'user|1-10':[{
			'name' : '@cname',
			'age|1-100' : 100,
			'id|+1' : 89,
			'birthday' : '@date("yyy-MM-dd")',
			'city' : '@city(true)',
	}],
	message: "操作成功",
	systemDate: new Date().getTime()
}
);
