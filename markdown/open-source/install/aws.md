# Installing on AWS

The quickest way for you to try out jambonz is to create an account on [jambonz.cloud](https://jambonz.cloud/register).  This gets you up and running with a few clicks of the mouse, and all of your applications can later be re-pointed to a self-hosted system that you build up.

When you are ready to build your own system, AWS is the recommended hosting provider for jambonz at the present time, because a lot of work has been done to integrate to AWS autoscaling groups and other resources that make deployment and management of a jambonz cluster easy.

> We intend to add similar scaling support for the other leading hosting providers in the near future.  If you want to run on a different public cloud and are willing to sponsor the work to make it happen, please contact us.

There are two supported methods for deploying a jambonz system in your AWS account

##### AWS Marketplace

You can deploy a single-server jambonz "mini" system on AWS in a snap by [clicking here](https://aws.amazon.com/marketplace/pp/prodview-55wp45fowbovo?).  This AMI is available in all AWS regions and is a great way to quickly stand up a low-cost jambonz system for testing or development purposes.

> Coming soon on AWS Marketplace: we will be offering additional jambonz subscriptions that are suited for a wider variety of deployments - alongside with the "mini" you will be able to choose from a small, medium, or large deployment (just like buying an ice cream cone!).

A few notes when spinning up the AMI for the first time:

<ul>
<li>After the AMI is running for the first time, wait a minute or two before trying to access the portal.  There are some userdata scripts that need to finish running to configure the webapp for use.  If you attempt to log in before it is complete, you will get a 502 Bad Gateway response.  If this happens, just wait a minute or two and try again.</li>
<li>The output variables on the AWS console after the AMI has been deployed will give you the URL of the portal and the username and password to use.  The username will be 'admin' and the initial password will the AWS host-id of the EC2 instance.  You will be forced to set a new password when you log in for the first time.</li>
</ul>

##### Terraform and packer scripts

A second option is to use our packer and terraform scripts to deploy a jambonz system on AWS.  This is a bit more work, because you need to build your own AMIs.  You will use packer to build two AMIs (and SBC/web server and a Feature Server), and then you will use terraform to deploy a jambonz system with those AMIs.

Here is what you will need to do:

###### Build AMIs

Check out [jambonz-infrastructure](https://github.com/jambonz/jambonz-infrastructure) repo to your local machine.  Make sure you have installed the AWS CLI as well as [packer](https://www.packer.io/) and [terraform](https://www.terraform.io/).

<ul>
<li>change into the ./packer/jambonz-sbc-sip-rtp directory of the repo.  Edit the <a href="https://github.com/jambonz/jambonz-infrastructure/blob/0692528616a7ddf3b4b113cc0f1362f4e47fcc36/packer/jambonz-sbc-sip-rtp/template.json#L3">region variable</a> in the template.json file to indicate the region where you want to build the AMIs, if different than us-east-1.</li>
<li>in a terminal window in the `./packer/jambbonz-sbc-sip-rtp` directory, run the command <br/><code>packer build -color=false template.json</code></br>This will create a new AMI for the SBC function under your account in the specified region.  Make note the of the AMI id.</li>
<li>change into the `./packer/jambbonz-feature-server` directory of the repo and repeat the steps above to build a second AMI for the feature server element.  Make note of this AMI id as well.</li>
</ul>

###### Modify terraform script and deploy

- change into the ./terraform/jambonz-devtest directory
- edit [variables.tf](https://github.com/jambonz/jambonz-infrastructure/blob/master/terraform/jambonz-devtest/variables.tf).  You are going to need to change the following variables: 
- "ami_owner_account" should be set to your AWS account id; 
- "region" should be set to the region you want to deploy in -- the same region the AMIs are in; "public_subnets" will need to be modified as well to have the name of the subnets in your desired region.
- change "ec2_instance_type_sbc" and "ec2_instance_type_fs" to the AMI ids that you built in the previous step, and 
- change "key_name" and "ssh_key_path" to your ssh key-pair name and path.

At that point you can run the terraform script:

```bash
terraform init
terraform apply
```
This will build a VPC with associated subnets and internet gateway, security groups etc, and will create one EC2 instance that is the SBC and web server, and a second EC2 instance that is the feature server.  The feature server will be in an autoscale group.  Also, an aurora serverless mysql database and a redis elasticache service will be created.

After deployment, you can log into the portal at http://<sbc-public-ip>:80 and log in as admin/admin.  You will be forced to change the password after you first log in.
