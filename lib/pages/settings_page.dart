import 'package:flutter/material.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('设置'),
      ),
      body: ListView(
        children: [
          ListTile(
            leading: const Icon(Icons.info),
            title: const Text('关于'),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // 导航到关于页面
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => AboutPage()),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.update),
            title: const Text('版本'),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // 导航到版本页面
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => VersionPage()),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.support_agent),
            title: const Text('客服'),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // 导航到客服页面
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SupportPage()),
              );
            },
          ),
        ],
      ),
    );
  }
}

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('关于'),
      ),
      body: const Center(
        child: Text('关于页面内容'),
      ),
    );
  }
}

class VersionPage extends StatelessWidget {
  const VersionPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('版本'),
      ),
      body: const Center(
        child: Text('版本页面内容'),
      ),
    );
  }
}

class SupportPage extends StatelessWidget {
  const SupportPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('客服'),
      ),
      body: const Center(
        child: Text('客服页面内容'),
      ),
    );
  }
}