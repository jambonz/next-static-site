# Open source that we use

We are proud to have built jambonz by standing on the shoulders of some awesome open-source products. 

Building an application like jambonz requires curating a selection of the best open source products, and without exception these products have been a delight to work with and are well-supported by talented teams of developers. Please consider supporting them!

| product        | used for | license  |
| ------------- |-------------| -----|
| <a href="https://drachtio.org" target="_blank">drachtio</a> | application logic and call control | <a href="https://github.com/drachtio/drachtio-srf/blob/master/LICENSE" target="_blank">MIT</a> |
| <a href="https://github.com/sipwise/rtpengine" target="_blank">rtpengine</a> | media proxy and transcoding | <a href="https://www.gnu.org/licenses/quick-guide-gplv3.html" target="_blank">GPL v3.0</a> |
| <a href="https://github.com/signalwire/freeswitch" target="_blank">freeswitch</a> | media server | <a href="https://github.com/signalwire/freeswitch/blob/master/LICENSE" target="_blank">MPL v1.1</a> |
| <a href ="https://github.com/drachtio/drachtio-freeswitch-modules" target="_blank">freeswitch plugins</a> | audio integrations w/ google, AWS, others| <a href="https://github.com/drachtio/drachtio-freeswitch-modules/blob/master/LICENSE" target="_blank">MIT</a> |
| <a href="https://www.apiban.org/" target="_blank">apiban</a> | SBC protection from bad actors |<a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank">GPL v2.0</a>  |
| <a href="https://expressjs.com/" target="_blank">express</a> | HTTP middleware and web framework |<a href="https://github.com/expressjs/expressjs.com/blob/gh-pages/LICENSE.md" target="_blank">Creative Commons v3.0</a>  |
| <a href="https://nodejs.org/" target="_blank">Node.js</a> | Javascript runtime |<a href="https://github.com/nodejs/node/blob/master/LICENSE" target="_blank">MIT</a>  |
| <a href="https://libwebsockets.org/" target="_blank">libwebsockets</a> | websockets library |<a href="https://github.com/warmcat/libwebsockets/blob/main/LICENSE" target="_blank">MIT</a>  |
| <a href="https://www.mysql.com/" target="_blank">mysql</a> | susbcriber database |<a href=" http://oss.oracle.com/licenses/universal-foss-exception" target="_blank">GPL v2.0 with FOSS Exception</a>  |
| <a href="https://github.com/influxdata/telegraf" target="_blank">Telegraf</a> | metrics agent | <a href="https://github.com/influxdata/telegraf/blob/master/LICENSE" target="_blank">MIT</a> |
| <a href="https://github.com/influxdata/influxdb" target="_blank">Influxdb</a> | time series database | <a href="https://github.com/influxdata/influxdb/blob/master/LICENSE" target="_blank">MIT</a> |
| <a href="https://redis.io/" target="_blank">Redis</a> | key-value store | <a href="https://redis.io/topics/license" target="_blank">3-clause BSD</a> |
| <a href="https://github.com/sipcapture" target="_blank">Homer (optional)</a> | SIP capture | <a href="https://github.com/sipcapture/homer/blob/homer7/LICENSE" target="_blank">AGPL v3.0</a><span style="vertical-align: super; color: #da1c5c; font-size: 80%">*</span> |
| <a href="https://www.postgresql.org" target="_blank">Postgresl (optional)</a> | homer database | <a href="https://www.postgresql.org/about/licence/" target="_blank">PostgreSQL License</a> |

<p><span style="vertical-align: super; color: #da1c5c">*</span> Note that:</p>
<p>
<ol style="font-size: 80%; margin-left: 10px">
<li>When using Homer with the AGPL v3 license, any changes that you make to the jambonz source code <strong>are not</strong> considered a "covered work" under the homer license, as the two programs are not linked.  <br/>TLDR: any changes you make to jambonz source code remain under the more permissive MIT license.</li>
<li><a href="https://qxip.net/" target="_blank">QXIP</a>, the creator of Homer and the <a href="https://github.com/sipcapture/HEP" target="_blank">HEP protocol</a>, also offer a non-GPL option (<a href="https://hepic.tel" target="_blank">HEPIC</a>) that is specifically designed for the needs of large-scale telcos and Communications Service Providers.  We highly recommend it to those who need a carrier-class monitoring and SIP capture solution.</li>
<li>If, after reading the above, you (or the company you work for) are still scared off by the AGPL v3 license, and are not interested in <a href="https://hepic.tel" target="_blank">HEPIC</a> (have you checked it out?), then know that Homer is not a required component of jambonz: simply don't install it or remove it.
</li>
</ol>
</p>