# Installing on AWS

The recommended way to trial the jambonz software is to [create an account](https://jambonz.cloud/register) on the hosted jambonz system, since this allows you to get up and running in minutes without building servers.  Plus, you can always migrate to a self-hosted system at any time with no changes.

When you are ready to build a self-hosted solution (or if you prefer to start with a self-hosted solution), then AWS is the preferred hosting provider for jambonz, because a lot of work has been done to implement a scaling solution that uses AWS autoscale groups and SNS lifecycle notifications to scale gracefully and effectively.

> We intend to add similar scaling support for the other leading hosting providers in the near future.  Please contact us if you have specific needs in this regard.

The [jambonz-infrastructure](https://github.com/jambonz/jambonz-infrastructure) repo contains two terraform scripts that you can choose between to create a jambonz cluster:

- [jambonz-devtest](https://github.com/jambonz/jambonz-infrastructure/tree/master/terraform/jambonz-devtest) - this creates a deployment suitable for testing and smaller production deployments.  It consists of an autoscale cluster of feature servers, a single Session Border Controller (SBC) server, and a monitoring server.
- [jambonz-prod](https://github.com/jambonz/jambonz-infrastructure/tree/master/terraform/jambonz-prod) - this creates a deployment suitable for larger production deployments.  It consists of an autoscale cluster of feature servers, two SBCs (with signaling and media handled on different EC2 instances), and a monitoring server.

The terraform scripts require certain Amazon Machine Images (AMIs) to have been created.  The stock version of the terraform scripts search for AMIs under the drachtio AWS account; however, these AMIs are not guaranteed to updated to the latest release at all points in time, so it is recommended that you build AMIs under your account using the provided [packer](https://github.com/jambonz/jambonz-infrastructure/tree/master/packer) scripts.  After building the AMIs, you should edit the terraform templates to reference your account as owner (e.g. [here](https://github.com/jambonz/jambonz-infrastructure/blob/50a30cfe85806fea819d4c4ea952e85de475eeb8/terraform/jambonz-devtest/feature-server.tf#L53))

This video provides a step-by-step tutorial on how to bring up a jambonz cluster on AWS

> Note: This video was recorded before the monitoring server was implemented, so the cluster created consists of only two servers instead of the three that will be produced when you follow these steps.

> Note: This video uses the stock terraform scripts that utilizes the AMIs published under the drachtio AWS account. You are free to use these, but as recommended above before going into production you may wish to generate your own AMIs using the provided packer scripts.

<br/>
<div class="video-wrap">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Mniskl22GDI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
